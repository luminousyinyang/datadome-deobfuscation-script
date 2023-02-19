//dd captcha service
//https://ct.captcha-delivery.com/c.js
// dd script
//https://js.datadome.co/tags.js
// dd api to post script payload to.
//https://api-js.datadome.co/js/

// telemetry data in its prime 😌

const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const generate = require("@babel/generator").default;
const beautify = require("js-beautify");
const { readFileSync, writeFile } = require("fs");
const { Referenced } = require("@babel/traverse/lib/path/lib/virtual-types");
const { constants } = require("buffer");
const {validIdentifierRegex, renameDictionary, renameDictionary2} = require("./validIdentifierReg");
const path = require("path");


function deobfuscate(source) {
    let ast = parser.parse(source);


    const deadcodeRemovalVisitor = {
        EmptyStatement(path) {
            path.remove();
        },
        "VariableDeclarator|FunctionDeclaration"(path) {
            const { node, scope } = path;
            const { constant, referenced } = scope.getBinding(node.id.name);
            if (constant && !referenced) {
                path.remove();
            }
        },
        "ConditionalExpression|IfStatement"(path) {
            let { consequent, alternate } = path.node;
            let testPath = path.get("test");
            const value = testPath.evaluateTruthy();
            if (value === true) {
                if (t.isBlockStatement(consequent)) {
                    consequent = consequent.body;
                }
                path.replaceWithMultiple(consequent);
            } else if (value === false) {
                if (alternate != null) {
                    if (t.isBlockStatement(alternate)) {
                        alternate = alternate.body;
                    }
                    path.replaceWithMultiple(alternate);
                } else {
                    path.remove();
                }
            } 
        },
    };

    traverse(ast, deadcodeRemovalVisitor);


    const reverseStringVisitor = {
        StringLiteral(path) {
            if (path.node.extra) delete path.node.extra;
        },
        VariableDeclaration(path) {
            const { declarations }  = path.node;
            if (
                declarations.length !== 1 || !t.isArrayExpression(declarations[0].init)
            ) return;
            const stringArrayElements = [];
            for (const elementNode of declarations[0].init.elements) {
                if (!t.isStringLiteral(elementNode)) return;
                else {
                    stringArrayElements.push(elementNode);
                }
            }
            const stringArrayName = declarations[0].id.name;
            const idPath = path.get("declarations.0.id");
            const binding = idPath.scope.getBinding(stringArrayName);

            if (!binding) return;

            const { constant, referencePaths } = binding;

            if (!constant) return;
            let shouldRemove = true;

            for (const referencePath of referencePaths) {
                const { parentPath: refParentPath } = referencePath;
                const { object, computed, property } = refParentPath.node;
                if (!(t.isMemberExpression(refParentPath.node) 
                && object == referencePath.node && computed == true 
                && t.isNumericLiteral(property))) {
                    shouldRemove = false;
                    continue;
                }

                refParentPath.replaceWith(stringArrayElements[property.value]);
            }
            if (shouldRemove) path.remove();
        },
        BinaryExpression(path) {
            let { confident, value } = path.evaluate();
            if (!confident) return;
            if (typeof value == "string") {
                path.replaceWith(t.stringLiteral(value));
            }
        },
    }

    traverse(ast, reverseStringVisitor);

    const bracketToDotNotationVisitor = {
        MemberExpression(path) {
            let { object, property, computed} = path.node;
            if (!computed) return;
            if (!t.isStringLiteral(property)) return;
            if (!validIdentifierRegex.test(property.value)) return;

            path.replaceWith(t.MemberExpression(object, t.identifier(property.value), false));
        },
    }

    traverse(ast, bracketToDotNotationVisitor);

    const unJSFuckVisitor = {
        ArrayExpression(path) {
            for (elem of path.get("elements")) {
                if (!elem.node) {
                    elem.replaceWith(t.valueToNode(undefined));
                }
            }
        },
        "BinaryExpression|UnaryExpression"(path) {
            let { node } = path;
            if (t.isUnaryExpression(node) && (node.operator == "-" || node.operator == "void")) return;
            let { confident, value} = path.evaluate();
            if (!confident || value == Infinity || value == -Infinity) return;

            let actualVal = t.valueToNode(value);
            path.replaceWith(actualVal);
        },
    }
    traverse(ast, unJSFuckVisitor);

    const constantFoldingVisitor = {
          BinaryExpression(path) {
            const left = path.get("left");
            const right = path.get("right");
            const operator = path.get("operator").node;
      
            if (t.isStringLiteral(left.node) && t.isStringLiteral(right.node)) {
              let { confident, value } = path.evaluate();
              if (!confident) return;
              let actualVal = t.valueToNode(value);
              if (!t.isStringLiteral(actualVal)) return;
              path.replaceWith(actualVal);
            } else {
              if (!t.isStringLiteral(right.node)) return;
              if (!t.isStringLiteral(left.node.right)) return;
              if (operator !== "+") return;
      
              let concatResult = t.StringLiteral(
                left.node.right.value + right.node.value
              );
              left.get("right").replaceWith(concatResult);
              right.remove();
            }
          },
    }
    traverse(ast, constantFoldingVisitor);

    const replaceSecondaryVars = {
        VariableDeclarator(path) {
            let { node, scope } = path;
            let { init } = node
            if (!init) return
            if (!t.isIdentifier(init)) return
            let binding = scope.getBinding(node.id.name)

            for (let refPath of binding.referencePaths) {
                refPath.replaceWith(init)
            }
            path.remove()
        }
    }
    traverse(ast, replaceSecondaryVars)


    const renameVisitor = {
        Identifier(path) {
            let { node } = path
            let { name } = node
            if (name in renameDictionary 
                && name !== "toString" && name !== "__proto__" 
                && name !== "hasOwnProperty" && name !== "constructor") {

                let newName = renameDictionary[name]
                let newIdentifier = t.identifier(newName)

                let scope = path.scope;
                let binding = scope.getBinding(name)
                for (let refPath of binding.referencePaths) {
                    refPath.replaceWith(newIdentifier)
                }
                path.replaceWith(newIdentifier)
            }
        }
    }
    traverse(ast,renameVisitor)



    // *****************
    // *****************
    // *****************
    // START OF VM TO HELP DECODE DEOBFUSCATED SCRIPT STRING VALS AND VAR NAMES.
     function getEncodedStrings() {
        var encodedStrings = ["yxbWzw5Kq2HPBgq", "CMvWBgfJzunVB2TPzurVBwfPBG", "x193zwjKCML2zxjFDw53CMfWCgvK", "yxjZx3C", "zgv2AwnLtwvTB3j5", "C2nYzwvU", "tgLUDxG", "D3nKyW", "CgXVCW", "x193zwjKCML2zxjFC2nYAxb0x2z1BMm", "ywXSB3DiDg1Sq29UDgvUDfr5CgvpBKnHChrJAge", "EYj1CMWIoIi", "z2v0rwXLBwvUDhncEvrHz05HBwu", "zgrFzW", "DMmXDhm", "DMLKzw8VBxa0oYbJB2rLy3m9iMf2yZeUndjfmdffiG", "rgf0zvrPBwvgB3jTyxq", "DMLKzw8Vm2DWCdS", "zgvMAw5Lza", "DwLK", "Dg9tDhjPBMC", "CMvSB2fK", "z2v0ugfYyw1LDgvY", "zgrFEG", "AgnVDMrYmG", "x19Syxn0v2f0AxjbBgvYDa", "ywnMDhm", "zgrFva", "oeXpBgDSDW", "CMvTB3zLq2HPBgq", "CMfUzg9T", "D2LUzg93", "CMvWzwf0", "DgHLBG", "lI4U", "ywrKrxzLBNrmAxn0zw5LCG", "zgrFrG", "zgrszxnWB25ZzvbHz2u", "q29UDgvUDc10ExbL", "tMf2AwDHDg9YvufeyxrH", "DMLKzw8VCxvPy2T0Aw1LoW", "B24OC2vSzwn0B3iSihDPDa", "yxDLC29TAxvT", "AgvHza", "yxvKAw8VywfJoW", "zgrFyMXVy2TLza", "DMnVDhm", "BxbFy3K", "zxzLBNroyw1LCW", "x19WCM90B19F", "DMnXDhm", "zgrFzq", "z2v0", "DMnTCa", "zxH0zxjUywW", "B3bY", "zgrFAa", "AgfZt3DUuhjVCgvYDhK", "lI9SAxzLlwv2zw50CY9eyxrHrg9Tzuv2zw50C1rYywnRAw5N", "C2v0sxrLBq", "Dhj1C3ruB2TLBG", "ChjVy2vZCW", "DgLTzvn0yw1W", "rg9TywLUpq", "C2LYza", "BMfTzq", "z2v0q29UDgv4Da", "DgvZDa", "zgLZCgXHEunHChrJAgfqywDL", "ywn3BxrZ", "y2fUDMfZ", "yNjVD3nLCMzSB3CTy29UDgfPBMvY", "ywnTCdr0CW", "x193zwjKCML2zxjgDw5J", "yw5KCM9Pza", "lI4Vy29TBw9Ul0rHDgfeB21Lvg9VBhm", "yMLK", "y2HYB21L", "C2nYzwvUwa", "ANneyxrHpq", "CgvYBwLZC2LVBNm", "t3bLCMe", "DxnLCKXHBMD1ywDL", "zgrFy2fWDgnOyv9WyxnZzwq", "C2LNBMfS", "ywn3Bq", "iIbguKfnrujpuKrfuJ0ImciGyM9YzgvYpsiWiIbZy3jVBgXPBMC9iNLLCYi+pc9PzNjHBwu+", "DhjPzgvUDa", "ue9tva", "Ahr0Chm6lY9JDc5Jyxb0y2HHlwrLBgL2zxj5lMnVBq", "CMvTB3zLu3vIC3rYAw5Nugf0DgvYBG", "zxDZAq", "zgrFuW", "yMLUza", "Bg9JyxrPB24", "zgrFvq", "DgvZDgLUz01Vzgu", "CgvYBwLZC2LVBG", "CMvWBgfJzq", "AhnO", "x19Syxn0v2f0AxjdB25MAxjT", "jNjLC3bVBNnLugfNzt0", "Dgv4Da", "ndy0ndGXmta4nG", "BM93za", "x193zwjKCML2zxjFC2nYAxb0x2zU", "z2v0rxH0zw5ZAw9U", "vvjmu2vHCMnOugfYyw1Z", "AgvPz2H0oIaTD2vIA2L0lwzPBgWTyxzHAwXHyMXLoW", "yM9KEsb7ig92zxjMBg93oIbOAwrKzw47ic13zwjRAxqTDhjHBNnMB3jToIbZy2fSzsGXksaHAw1WB3j0yw50oW", "A2v5zg93BG", "Bwf4", "y29VA2LL", "DgvZDePZrgf0yq", "z2v0uxvLCNLqyxjHBxntDhjPBMC", "BgfUz3vHz2vZ", "qMfYy29KzurLDgvJDg9Y", "suvdDxn0B21fDMvUDa", "y2XPzw50v2LKDgG", "zgrFywq", "jIn4mMq7", "zNrZB3zKCG", "zxHWB3j0CW", "DgfYz2v0", "ChjVBxb0", "z2v0q29VA2LL", "A2v5Dxa", "yxzHAwXxAwr0Aa", "CxvLCNK", "mtbZzwjdwwG", "C3zKzq", "yxvKAw8VEc1Tnge7", "lI8UlI9JB21TB24Vrgf0yurVBwvuB29SCW", "A2v5C0rLBhrH", "C2vHCMnO", "rtqYntu5n0veounbqJC5mtHcmZvfqJiZrKverJKW", "zgrQC2TLEq", "rgLZCgXHEu5HBwvZ", "qw5KCM9Pza", "Cg9ZDgvK", "yNrVyq", "B3v0zxjxAwr0Aa", "uhjVDg90ExbL", "DxnLCKfNzw50", "zNvUy3rPB24", "q2fUBM90igzPBMqGBw9KDwXLicC", "Bw92zw1LBNrz", "ywmZDhm", "j2nPzcC6", "y29UDgvUDfDPBMrVDW", "AgfZAa", "mtC0odyWmxLeA3zPwq", "BgvU", "C2XPy2u", "zgnVAW", "zNrZB3zKCJi", "vg90ywW6ia", "zgrFqG", "CgXNz3q", "BxnpCMLLBNrHDgLVBG", "y29UC29Szq", "zxHLyW", "x19KCML2zxjFzxzHBhvHDgu", "Bg9NmW", "v2LUzg93CW", "D2vIlxnJCMfWzxiTy2fSBgjHy2S", "Cg9ZDe1LC3nHz2u", "ywnTCdn0CW", "DMLKzw8VD2vIBtSGy29KzwnZpsj2CdGSihzVCMjPCYi", "ywn3", "BM93", "D2rPzG", "ywnHyq", "D2L0AenYzwrLBNrPywXZ", "v0vcr0XFzgvIDwDFCMvUzgvYzxjFAw5MBW", "C29YDa", "zgrFywu", "x19KCML2zxjFDw53CMfWCgvK", "C2v0uhjVDg90ExbLt2y", "Ahr0Chm6lY9Nzw8Uy2fWDgnOys1KzwXPDMvYEs5JB20", "BxbFBxG", "CMvZCg9UC2vvuKW", "zgrFDa", "y29YCMvSyxrPB25FAwq", "qNvMzMvY", "yMXVy2TLza", "yNvPBgrjra", "zgrFqq", "zgLZCgf0y2HfDMvUDa", "zgf0yq", "zgrFDq", "B3rOzxi", "zgrFAG", "BgfUz3vHz2u", "Dg9mB3DLCKnHC2u", "Au9t", "AgLKzgvU", "ywnTCdm", "AhjLzG", "lI8UlI9MAw5NzxjWCMLUDc9eyxrHrg9TzufUywX5EMvY", "zxzHBhvHDgu", "C3rJzNa", "zg9JDw1LBNq", "yxvKAw8VBxaZoW", "twLTzvr5CgvbCNjHEq", "yMzSDW", "y29Kzq", "Cg9YDdi", "yxvKAw8Vm2DWCdS", "zgv0ywnOrxzLBNq", "ywPHEeXPC3rLBMvYugf0Aa", "C2v0qxr0CMLIDxrL", "C2vYDMLJzvDVCMTLCG", "Aw5KzxHpzG", "B3jPzw50yxrPB24", "yNjFB3C", "oezfmengn0y4quiZmevdntG4ntK5rdGWndzfrdbf", "zgrFza", "nZy1rJrgq0rerJzcrurdmtffqZzgotmZqZjcqKfg", "pc9KAxy+", "AxbOB25L", "DMn3Dhm", "ywnV", "CMvXDwvZDefWAq", "twfJ", "ywnVCW", "C3LZDgvTtgfUz3vHz2u", "DhPW", "DxjS", "AgvHzgvYCW", "zgrFuG", "AxnbyNnVBhv0zvvYBa", "mJiXmuy1mJjcnJffmJy5qJG2ouzbnKvbrKzcnuuX", "AxbHza", "y3jLzgvUDgLHBhm", "B3zLCNjPzgvdB29RAwveB21HAw4", "ywnM", "zM9YrwfJAa", "Bwf0y2HvuKXqyxj0CW", "y3jLyxrLrxzLBNq", "AwrU", "zw1PDa", "C2vSzG", "C3rHy2S", "lI9ODhrWl0rHDgfeB21LuMvZCg9UC2u", "Ag9ZDa", "yL9L", "DMnV", "x19ZzwXLBML1Bv9LDMfSDwf0zq", "DMvUzg9Y", "CgXNB2y", "Aw5JBhvKzq", "DMnO", "Bw92zw1LBNry", "yxvKAw8VD2vIBtS", "D2LU", "Cgf0Aa", "jNjLCxvLC3q9", "zgrFsG", "CgfYC2u", "zxHWB3nLq2fWDgnOyuz1BMn0Aw9U", "lI9SAxzLlwv2zw50CY9eyxrHrg9TzufZEw5Jq2HHBgXLBMDLC1rYywnRAw5N", "A2v5CW", "C2XLDNq", "zxzLBNrZvhjHy2TPBMDfBMfIBgvK", "mJC3mJuYvvvHzhHg", "Bw1FBwq", "y2nZCG", "sw50zxjUzxqGrxHWBg9Yzxi", "ChjVDg90ExbL", "D2LKDgG6mtaWjtTWB3nPDgLVBJPHyNnVBhv0ztT0B3a6mdTSzwz0oJa7EI1PBMrLEdOYmtq3ndGZnJq3o2jHy2TNCM91BMqTy29SB3i6i2zMzMzMzJSIpG", "y2XPzw50wq", "yxvKAw8VD2f2oYbJB2rLy3m9iJeI", "zg9Tqxv0B21HDgLVBG", "C2vUza", "Aw5UzxjizwLNAhq", "C3bHD24", "C3rHDgu", "yxbWBgLJyxrPB24VEc13D3CTzM9YBs11CMXLBMnVzgvK", "ugX1z2LUqxjYyxK", "yxbWBhK", "AwzYyw1L", "zgrFyW", "D2r3", "C2nYzwvUwq", "z2v0t3DUuhjVCgvYDhLezxnJCMLWDg9Y", "yNjVD3nLCMzSB3CTC3rHDhvZ", "zgrFta", "q2HYB21L", "zgrFywe", "CMvHzhK", "C2nYB2XSvg8", "zgvIDwC", "ndeYotqWneTRv0Tssq", "mdbeotu4ruveqJzfmZGYq0ndrJyWmZuXqurdqKm1", "yNjVD3nLCKXHBMD1ywDL", "y2XPzw50wa", "zgrFywy", "y2zMChC", "CgXNCMu", "ywjVCNrbC3LUy09Uq2fWDgnOyurPC3bSyxK", "Bg9JywXtDg9YywDL", "ChjVzhvJDfn1yG", "zgrFAW", "ywnTyq", "rMLYzwzVEa", "y2zWzMu", "yxvKAw8VzMXHyZS", "BgDZ", "CxvLCNLtzwXLy3rVCG", "zgrdyMG", "ywjVCNq", "zgrFqW", "yxn5BMndAgfSBgvUz2vgAw5PC2HLza", "zgrFsq", "AxnmB2nHBfn0B3jHz2vfBMfIBgvK", "DMLKzw8", "CMvZCg9UC2vqywDL", "C3rYAw5N", "ChjVy2vZC1n5BMnszxf1zxn0", "yxvKAw8VBxa0oW", "sfrntfzPzgvVrwXLBwvUDa", "zgv2AwnLugL4zwXsyxrPBW", "zgrFEa", "we1mshr0CfjLCxvLC3q", "zxjYB3jMzxrJAa", "ywPHEeXPC3rLBMvYugf0Aev4y2X1C2LVBG", "C3rYAw5NAwz5", "CMvZCg9UC2vuzxH0", "y29UDgfJDhm", "zgrFDG", "B2jQzwn0", "mZa4ndm3ohjZBMnvBq", "AM9PBG", "zwXLy3rYB24", "B3v0zxjizwLNAhq", "zgf0yurVBwvpChrPB25Z", "z2X2za", "Ag9ZDg5HBwu", "CxvLCNLtzwXLy3rVCKfSBa", "Bwf4vg91y2HqB2LUDhm", "qxvKAw9eyxrH", "zgrFCG", "lI9JB21TB24Vrgf0yurVBwvuB29SCW", "t3rOzxi", "CgXVDMrYmG", "CMvZCg9UC2vuExbL", "DhnFDgvJ", "vu5nqvnlrurFuKvorevsrvjFv0vcr0W", "yxn5BMnOCM9UAxPLvgfZAW", "ig9IAMvJDcbJB3vSzcbUB3qGyMuGy2XVBMvKlG", "ywnHyxrZ", "ywnTCa", "z2v0sw5MB0nSAwnR", "jgnKy19HC2rQzMXHC3v0B3bMAhzJwKXTy2zSxW", "Bw9IAwXL", "zgvMAw5LuhjVCgvYDhK", "zgjVDG", "DMLKzw8VBxbLzZS", "BNvHza", "yxqGt2jQzwn0lNnLDfbYBW", "y2f0y2G", "zgrFBa", "zw10", "y2HLy2TnB3vZzvbVC2L0Aw9U", "vu5nqvnlrurFvKvore9sx1DfqKDm", "C3rYx3nZ", "zgrFwq", "zgrFwa", "C2XHDa", "zgf0yurVBwvuB29SCW", "y2HPBgroB2rLCW", "x19ZzwXLBML1Bv91BNDYyxbWzwq", "BxbFC3G", "zgrFCa", "AxnbCNjHEq", "D2vIz2W", "rxLLrhjVChbLCG", "jMnPzd0", "CgXHDgzVCM0", "Dw5RBM93BG", "BwfJ", "zMLYzwzVEa", "y2rJEa", "C3rYx2LKyG", "rMfPBgvKihrVigv4zwn1DguGj3bVC3rnzxnZywDLjYbVBIaNv2LUzg93jZOG", "v2LUzg93CYbqAg9Uzq", "lI8UlI9ODhrWl0rHDgfeB21LuMvXDwvZDa", "y2LK", "zwrW", "y2fUugXHEvr5Cgu", "y29UDhjVBgXLCG", "mJaWmZaXmdC", "zgrFvW", "AxnuExbLu3vWCg9YDgvK", "C3fYDa", "y2fWAq", "zgrFywm", "yMXVyG", "C2v0vgLTzw91Da", "y2fSBgvL", "yL91", "DhjPBq", "uKvorevsrvi", "y2HLy2S", "CgfYzw50rwXLBwvUDa", "y2fJAgvF", "y2zWCa", "BwLTzvr5CgvZ", "CgX1z2LUCW", "C2vYAwfSAxPLvg9tDhjPBMC", "yMvMB3jLDw5SB2fK", "DhLWzq", "zgrFtq", "z2XYza", "C2nYB2XS", "y2fSBgvY", "yMzY", "DhrZDa", "zg9Tqxv0B21HDgLVBKnVBNrYB2XSzxi", "zgrFDW", "ChjT", "Aw5Zzxj0qwrQywnLBNrive1m", "AgnVDMrY", "BgvUz3rO", "ywXIlNjLzgrPDa", "BMnSywq", "BwvZC2fNzq", "CMvZB2X2zwrpChrPB25Z", "z2v0vMLKzw9qBgf5yMfJA1f1ywXPDhK", "CMvTB3zLrxzLBNrmAxn0zw5LCG", "zw1WDhK", "B3bLBG", "x1DfqKrssvzfuL9ftevnx0nbq0Hf", "yMvMB3jLzw5K", "ywnVDhm", "ywnTyxrZ", "Cgf0DgvYBLrVuMvTB3zLrNjVBvjLzMvYCMvYvxjS", "BM9jzNjHBwu", "zgrFra", "zgLZCgXHEurHDgfeB21Lq2fWDgnOyvbHz2u", "y2fUy2vSqw5PBwf0Aw9UrNjHBwu", "DMnX", "Bg9NmG", "yxr0ywnOrxzLBNq", "yNvPBgrtAwDUywXZ", "C2vSzw5PDw0TzxzHBhvHDgu", "twvZC2fNzunOyw5UzwW", "ANnM", "zw5HyMXLvgfNrxzLBNrZ", "AxnuCNvZDgvK", "BMrKyW", "nJm4mtq0nuTbwuzbwG", "CgX1", "BM90AwzPy2f0Aw9UCW", "mdvcmZbcrdKWntu5odzcrdjfrtHgnueXotLeotCZ", "Bwf0y2G", "y3vZDg9TugfYyw0", "DNbICq", "zw5KCg9PBNq", "BNbTDg0", "DMmZ", "zgLS", "DMnTChrZ", "ywnTCdq", "Bg9N", "zNjHz21LBNq", "CgLRzq", "x19MEgrYAxzLCL9LDMfSDwf0zq", "y2zJChC", "yNjFB2G", "DwnKDG", "BgLUDxG", "x19Syxn0v2f0AxjqCM9TChq", "C3rHDhvZ", "D2vIzhjPDMvY", "y2fWDgnOyvbHC3nLza", "q29UDgfJDhnnyw5Hz2vY", "su5jvf9qt1ju", "CgXVDMrY", "AgfYzhDHCMvdB25JDxjYzw5JEq", "ywmZ", "zgrFAq", "y29SB3jezxb0Aa", "x18KD2vIzhjPDMvYqxn5BMnfEgvJDxrVCG", "zgf0ywrVBwu9mtSGtwf4lufNzt0WoYbqyxrOps87", "C2v0q29VA2LL", "B3zLCNjPzgvbyM9YDezLDgnO", "C2v0uMvXDwvZDeHLywrLCG", "zgrFuq", "zgrFCg9ZDf9KB25L", "C2HPzNq", "x19UAwDODg1HCMu", "rgf0yurVBwvdyxb0y2HHrgLZCgXHEwvK", "B3jPz2LU", "D2jK", "rxjYB3i6ia", "Dw5KzwzPBMvK", "zMLSDgvYqxn5BMnszxnWB25Zzq", "x3bOyw50B20", "ChvZAa", "BxnnyxHuB3vJAfbVAw50CW", "BMf2AwDHDg9Y", "y29RExm", "y2rJx2fKB1fWB2fZBMzHnZzWzMnAtg1JzMXFqxjYyxK", "zgrFBG", "zMXVB3i", "DxnI", "sw50Ba", "BgDZB2q", "y2XVC2u", "Bw91C2v1Ca", "Cg9ZDgLUzW", "jgnKy18", "y3jLyxrLrwXLBwvUDa", "rxjYB3i", "zgrFrW", "y2fSBa", "C2vUzejLywnVBG", "CNnFy2q", "DgjJzq", "nJyXoda1nNnZthLJBq", "mZmYodG3nNjsD2PgvG", "DMLKzw8VBxbLzW", "D2vIzhjPDMvYq29TBwfUza", "Ahr0Chm6lY9JlMrHDgfKBY5Tzq", "CgfYC2vjBNq", "CgX0B2q", "zgrFywi", "x3nLBgvUAxvT", "C3rYx29KyG", "zxjY", "zgLZywjSzuf1Dg9szwzYzxnOt25dyxb0y2HHugfZC2vK", "C2zLEa", "B3bLBKrHDgfIyxnL", "C2fMzurLBgv0zvzHCG", "DxnLCKfNzw50rgf0yq", "u2fMyxjP", "z2v0tw91C2vqB3nPDgLVBG", "zgrFBq", "Bw91C2vKB3DU", "ruXfq1rst04", "zgrFyG", "y2XPzw50sgvPz2H0", "zwnWyW", "CgXNBMu", "C3bSAxq", "ANnVBG", "ywrKDa", "zgrFCW", "BwvKAwfezxzPy2vZ"];
        getEncodedStrings = function() {
          return encodedStrings;
        };
        return getEncodedStrings();
      }

     (function(_0x2b5cbf, _0x39b1f6) {
        var _0x35df55 = _0x2b5cbf();
        while (true) {
          try {
            var _0x1e9032 = parseInt(decode(654)) / 1 * (-parseInt(decode(417)) / 2) + parseInt(decode(170)) / 3 + -parseInt(decode(360)) / 4 + parseInt(decode(518)) / 5 * (parseInt(decode(682)) / 6) + parseInt(decode(290)) / 7 + -parseInt(decode(359)) / 8 + parseInt(decode(540)) / 9;
            if (_0x1e9032 === _0x39b1f6) break;
            else _0x35df55.push(_0x35df55.shift());
          } catch (_0x4b3bc1) {
            _0x35df55.push(_0x35df55.shift());
          }
        }
      })(getEncodedStrings, 742034);
     

     function decode(_0x41e3cd, _0xb74499) {
        var _0x521da2 = getEncodedStrings();
        return decode = function(_0x1bc7b9, _0x23c050) {
          _0x1bc7b9 = _0x1bc7b9 - 134;
          var _0x10f383 = _0x521da2[_0x1bc7b9];
          if (decode.XUxQSj === undefined) {
            var _0x2da175 = function(_0x95da34) {
              var base64Alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=";
              var _0x3f5639 = "",
                _0x2c4cc7 = "";
              for (var _0x4ab797 = 0, _0x56a67b, _0x773e27, _0x23b8cc = 0; _0x773e27 = _0x95da34.charAt(_0x23b8cc++); ~_0x773e27 && (_0x56a67b = _0x4ab797 % 4 ? _0x56a67b * 64 + _0x773e27 : _0x773e27, _0x4ab797++ % 4) ? _0x3f5639 += String.fromCharCode(255 & _0x56a67b >> (-2 * _0x4ab797 & 6)) : 0) {
                _0x773e27 = base64Alphabet.indexOf(_0x773e27);
              }
              for (var _0xdfabfb = 0, _0xef4677 = _0x3f5639.length; _0xdfabfb < _0xef4677; _0xdfabfb++) {
                _0x2c4cc7 += "%" + ("00" + _0x3f5639.charCodeAt(_0xdfabfb).toString(16)).slice(-2);
              }
              return decodeURIComponent(_0x2c4cc7);
            };
            decode.kglTTZ = _0x2da175, _0x41e3cd = arguments, decode.XUxQSj = true;
          }
          var _0xb85931 = _0x521da2[0],
            _0x1e9a46 = _0x1bc7b9 + _0xb85931,
            _0x3f2344 = _0x41e3cd[_0x1e9a46];
          return !_0x3f2344 ? (_0x10f383 = decode.kglTTZ(_0x10f383), _0x41e3cd[_0x1e9a46] = _0x10f383) : _0x10f383 = _0x3f2344, _0x10f383;
        }, decode(_0x41e3cd, _0xb74499);
      }
        // *****************
        // *****************
        // *****************
        // END OF VM 

    //   using VM it decodes the memberexpressions and strings with calls to the decode func
      const replaceDecodeFuncRefsVisitor = {
        CallExpression(path) {
            let { node } = path
            if (node.arguments[0] && node.arguments[0].name === "getEncodedStrings") {
                path.remove();
                return
            }
            if (node.callee.name != "decode") return
            if (!node.arguments) return;
            if (node.arguments.length != 1) return;
            let arg = node.arguments[0].value;
            let decodedStr = decode(arg);
            path.replaceWith(t.valueToNode(decodedStr))
        },
        FunctionDeclaration(path) {
            let name = path.node.id.name;
            if (name === "decode" || name === "getEncodedStrings") path.remove()
        }
      }

    traverse(ast,replaceDecodeFuncRefsVisitor)


    // visits any obj vars that are initalized as an empty obj
    // fills them up with any member expressions assignments that ref the obj var.
     const emptyObjectDeclarationVisitor = {
        VariableDeclaration(path) {
            let { node } = path
            let declarations = node.declarations
            if (declarations.length !== 1) return;
            if (!t.isObjectExpression(declarations[0].init)) return;

            let scope = path.scope;
            let binding = scope.getBinding(declarations[0].id.name)

            
            let refPathLength = binding.referencePaths.length
            let toEndCounter = 0;
            for (let refPath of binding.referencePaths) {
                if (t.isAssignmentExpression(refPath.parentPath.parentPath.node) && t.isMemberExpression(refPath.parentPath.node)) {
                    toEndCounter++;
                    let newPath = path.get("declarations")

                    for (let i in newPath) {
                        if (t.isObjectExpression(newPath[i].get("init").node)) {
                            newPath = newPath[i].get("init")
                            break
                        }
                    }

                    
                    if (t.isIdentifier(refPath.parentPath.parentPath.node.right) && refPath.parentPath.parentPath.node.left.computed) {
                        newPath.replaceWith(t.objectExpression([... newPath.node.properties ,t.objectProperty(t.valueToNode(refPath.parentPath.parentPath.node.left.property.value), t.identifier(refPath.parentPath.parentPath.node.right.name))]))
                    } else if (t.isIdentifier(refPath.parentPath.parentPath.node.right) && !refPath.parentPath.parentPath.node.left.computed) {
                        console.log(refPath)
                        newPath.replaceWith(t.objectExpression([... newPath.node.properties ,t.objectProperty(t.valueToNode(refPath.parentPath.parentPath.node.left.property.name), t.identifier(refPath.parentPath.parentPath.node.right.name))]))
                    } else if (t.isObjectExpression(refPath.parentPath.parentPath.node.right) && refPath.parentPath.parentPath.node.left.computed) {
                        newPath.replaceWith(t.objectExpression([... newPath.node.properties ,t.objectProperty(t.valueToNode(refPath.parentPath.parentPath.node.left.property.value), t.objectExpression(refPath.parentPath.parentPath.node.right.properties))]))
                    } else if (t.isMemberExpression(refPath.parentPath.parentPath.node.right) && !refPath.parentPath.parentPath.node.left.computed) {
                        if (refPath.parentPath.parentPath.node.right.object.name && refPath.parentPath.parentPath.node.right.property.name) {
                            newPath.replaceWith(t.objectExpression([... newPath.node.properties ,t.objectProperty(t.valueToNode(refPath.parentPath.parentPath.node.left.property.name), t.memberExpression(t.identifier(refPath.parentPath.parentPath.node.right.object.name),t.identifier(refPath.parentPath.parentPath.node.right.property.name)))]))
                        } else if (refPath.parentPath.parentPath.node.right.object.name && refPath.parentPath.parentPath.node.right.property.value) {
                            newPath.replaceWith(t.objectExpression([... newPath.node.properties ,t.objectProperty(t.valueToNode(refPath.parentPath.parentPath.node.left.property.name), t.memberExpression(t.identifier(refPath.parentPath.parentPath.node.right.object.name),t.identifier(refPath.parentPath.parentPath.node.right.property.value)))]))
                        } else if (refPath.parentPath.parentPath.node.right.object.object && refPath.parentPath.parentPath.node.right.object.property && refPath.parentPath.parentPath.node.right.property.value) {
                            newPath.replaceWith(t.objectExpression([... newPath.node.properties ,t.objectProperty(t.valueToNode(refPath.parentPath.parentPath.node.left.property.name), t.memberExpression(t.memberExpression(t.identifier(refPath.parentPath.parentPath.node.right.object.object.name), t.identifier(refPath.parentPath.parentPath.node.right.object.property.name)),t.identifier(refPath.parentPath.parentPath.node.right.property.value)))]))
                        } else if (refPath.parentPath.parentPath.node.right.object.object && refPath.parentPath.parentPath.node.right.object.property && refPath.parentPath.parentPath.node.right.property.name) {
                            
                            newPath.replaceWith(t.objectExpression([... newPath.node.properties ,t.objectProperty(t.valueToNode(refPath.parentPath.parentPath.node.left.property.name), t.memberExpression(t.memberExpression(t.identifier(refPath.parentPath.parentPath.node.right.object.object.name), t.identifier(refPath.parentPath.parentPath.node.right.object.property.value)),t.identifier(refPath.parentPath.parentPath.node.right.property.name)))]))
                        }
                    } else if (t.isMemberExpression(refPath.parentPath.parentPath.node.right) && refPath.parentPath.parentPath.node.left.computed) {
                        if (refPath.parentPath.parentPath.node.right.object.name && refPath.parentPath.parentPath.node.right.property.name) {
                            newPath.replaceWith(t.objectExpression([... newPath.node.properties ,t.objectProperty(t.valueToNode(refPath.parentPath.parentPath.node.left.property.value), t.memberExpression(t.identifier(refPath.parentPath.parentPath.node.right.object.name),t.identifier(refPath.parentPath.parentPath.node.right.property.name)))]))
                        } else if (refPath.parentPath.parentPath.node.right.object.name && refPath.parentPath.parentPath.node.right.property.value) {
                            newPath.replaceWith(t.objectExpression([... newPath.node.properties ,t.objectProperty(t.valueToNode(refPath.parentPath.parentPath.node.left.property.value), t.memberExpression(t.identifier(refPath.parentPath.parentPath.node.right.object.name),t.identifier(refPath.parentPath.parentPath.node.right.property.value)))]))
                        } else if (refPath.parentPath.parentPath.node.right.object.object && refPath.parentPath.parentPath.node.right.object.property && refPath.parentPath.parentPath.node.right.property.value) {
                            newPath.replaceWith(t.objectExpression([... newPath.node.properties ,t.objectProperty(t.valueToNode(refPath.parentPath.parentPath.node.left.property.value), t.memberExpression(t.memberExpression(t.identifier(refPath.parentPath.parentPath.node.right.object.object.name), t.identifier(refPath.parentPath.parentPath.node.right.object.property.name)),t.identifier(refPath.parentPath.parentPath.node.right.property.value)))]))
                        } else if (refPath.parentPath.parentPath.node.right.object.object && refPath.parentPath.parentPath.node.right.object.property && refPath.parentPath.parentPath.node.right.property.name) {
                            
                            newPath.replaceWith(t.objectExpression([... newPath.node.properties ,t.objectProperty(t.valueToNode(refPath.parentPath.parentPath.node.left.property.value), t.memberExpression(t.memberExpression(t.identifier(refPath.parentPath.parentPath.node.right.object.object.name), t.identifier(refPath.parentPath.parentPath.node.right.object.property.value)),t.identifier(refPath.parentPath.parentPath.node.right.property.name)))]))
                        }
                    } else if (t.isLiteral(refPath.parentPath.parentPath.node.right) && refPath.parentPath.parentPath.node.left.computed) {
                        newPath.replaceWith(t.objectExpression([... newPath.node.properties ,t.objectProperty(t.valueToNode(refPath.parentPath.parentPath.node.left.property.value), t.valueToNode(refPath.parentPath.parentPath.node.right.value))]))
                    } else if (t.isLiteral(refPath.parentPath.parentPath.node.right) && !refPath.parentPath.parentPath.node.left.computed) {
                        newPath.replaceWith(t.objectExpression([... newPath.node.properties ,t.objectProperty(t.valueToNode(refPath.parentPath.parentPath.node.left.property.name), t.valueToNode(refPath.parentPath.parentPath.node.right.value))]))
                    } else {
                        continue
                    }


                    

                    
                    if (refPath.parentPath.parentPath.parentPath.node.expressions && refPath.parentPath.parentPath.parentPath.node.expressions.length === 1) {
                        refPath.parentPath.parentPath.parentPath.remove()
                    }
                    
                    refPath.parentPath.parentPath.remove()
                }
                
            }
        }
     }

     traverse(ast,emptyObjectDeclarationVisitor)

    // replaces logical expressions that always equate to false.
     const falseFinderVisitor = {
        VariableDeclarator(path) {
            let { node } = path
            let { init } = node
            if (t.isLogicalExpression(init) && t.isBinaryExpression(init.left) && init.left.left.value === "function" 
            && init.left.operator === "==" && init.left.right.operator === "typeof" && init.left.right.argument.name === "require") {
                path.get("init").replaceWith(t.booleanLiteral(false))
                let binding = path.scope.getBinding(node.id.name)

                for (let refPath of binding.referencePaths) {
                    refPath.node.name = "alwaysFalse"
                }
                node.id.name = "alwaysFalse"
            }
        }
     }
     traverse(ast,falseFinderVisitor)

    //  mainly for the modules that have params they never access.
    // can't delete params since they still are required b/c they are passed into module.
    // if I delete or add an actual throwaway var ("_") then it just breaks program because of the comment above.
     const deadFuncParamsVisitor = {
        FunctionExpression(path) {
            let {node, scope} = path
            let throwawayCount = 1;
            for (let param in node.params) {
                let binding = scope.getBinding(node.params[param].name)
                if (binding && binding.referencePaths.length === 0) {
                    node.params[param].name = "throwAwayVar" + throwawayCount++
                }
            }
        },
        CallExpression(path) {
            let {node} = path
            let {callee} = node
            if (callee.object && callee.object.object && callee.object.object.object && callee.object.object.property.name === "intArrNumber"
            && node.arguments.length > 3) {
                for (let i = 3; i < node.arguments.length; i++) {
                    path.get("arguments")[i--].remove()
                }
            }
        }
     }

     traverse(ast,deadFuncParamsVisitor)

// just removes module 1 export func of check, i rlly dont need it.
// can delete this visitor transformation if you want to see the inner workings of that func.
     const testingDeadFuncsVisitor = {
        AssignmentExpression(path) {
            let { node } = path
            if (node.left.property && t.isFunctionExpression(node.right)) {
                if (node.left.property.name === "check" || node.left.property.value === "safeDeleteVar") {
                    path.remove()
                }
            }
        }
     }
      traverse(ast,testingDeadFuncsVisitor)

    //   renames all catch params to "err" since that is always what the params are for the catches in this program.
      const catchErrVarVisitor = {
        CatchClause(path) {
            let binding = path.scope.getBinding(path.node.param.name)
            
            if (binding && binding.referencePaths) {
                for (let refPath of binding.referencePaths) {
                    refPath.node.name = "err"
                }
            }

            path.node.param.name = "err"
        }
      }
       traverse(ast,catchErrVarVisitor)

       const renameVisitor2 = {
        Identifier(path) {
            let { node } = path
            let { name } = node
            if (name in renameDictionary2 
                && name !== "toString" && name !== "__proto__" 
                && name !== "hasOwnProperty" && name !== "constructor") {

                let newName = renameDictionary2[name]
                let newIdentifier = t.identifier(newName)

                let scope = path.scope;
                let binding = scope.getBinding(name)
                for (let refPath of binding.referencePaths) {
                    refPath.replaceWith(newIdentifier)
                }
                path.replaceWith(newIdentifier)
            }
        }
    }
    traverse(ast,renameVisitor2)

     const bracketToDotNotationVisitor2 = {
        MemberExpression(path) {
            let { object, property, computed} = path.node;
            if (!computed) return;
            if (!t.isStringLiteral(property)) return;
            if (!validIdentifierRegex.test(property.value)) return;

            path.replaceWith(t.MemberExpression(object, t.identifier(property.value), false));
        },
    }

    traverse(ast, bracketToDotNotationVisitor2);


    
    let deobCode = generate(ast, {comments: false}).code;
    deobCode = beautify(deobCode, {
        indent_size: 2,
        space_in_empty_paren: true,
    })
    writeCodeToFile(deobCode);
}

function writeCodeToFile(code) {
    let outputPath = "./deobfuscated/deobbedScript.js"
    writeFile(outputPath, code, (err) => {
        if (err) {
            console.log("Error writing file ", err)
        }else {
            console.log(`Wrote file to ${outputPath}`)
        }
        
    })
}

deobfuscate(readFileSync("./obfuscated/datadomeObfus.js", "utf8"));