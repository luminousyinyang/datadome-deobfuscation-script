// helper consts for deob script.
const validIdentifierRegex =
/^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[$A-Z\_a-z\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc][$A-Z\_a-z\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc0-9\u0300-\u036f\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u0669\u0670\u06d6-\u06dc\u06df-\u06e4\u06e7\u06e8\u06ea-\u06ed\u06f0-\u06f9\u0711\u0730-\u074a\u07a6-\u07b0\u07c0-\u07c9\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0859-\u085b\u08e4-\u08fe\u0900-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09cb-\u09cd\u09d7\u09e2\u09e3\u09e6-\u09ef\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c3e-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0ce6-\u0cef\u0d02\u0d03\u0d3e-\u0d44\u0d46-\u0d48\u0d4a-\u0d4d\u0d57\u0d62\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0e50-\u0e59\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f3e\u0f3f\u0f71-\u0f84\u0f86\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u102b-\u103e\u1040-\u1049\u1056-\u1059\u105e-\u1060\u1062-\u1064\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b4-\u17d3\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u18a9\u1920-\u192b\u1930-\u193b\u1946-\u194f\u19b0-\u19c0\u19c8\u19c9\u19d0-\u19d9\u1a17-\u1a1b\u1a55-\u1a5e\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1b00-\u1b04\u1b34-\u1b44\u1b50-\u1b59\u1b6b-\u1b73\u1b80-\u1b82\u1ba1-\u1bad\u1bb0-\u1bb9\u1be6-\u1bf3\u1c24-\u1c37\u1c40-\u1c49\u1c50-\u1c59\u1cd0-\u1cd2\u1cd4-\u1ce8\u1ced\u1cf2-\u1cf4\u1dc0-\u1de6\u1dfc-\u1dff\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2cef-\u2cf1\u2d7f\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua620-\ua629\ua66f\ua674-\ua67d\ua69f\ua6f0\ua6f1\ua802\ua806\ua80b\ua823-\ua827\ua880\ua881\ua8b4-\ua8c4\ua8d0-\ua8d9\ua8e0-\ua8f1\ua900-\ua909\ua926-\ua92d\ua947-\ua953\ua980-\ua983\ua9b3-\ua9c0\ua9d0-\ua9d9\uaa29-\uaa36\uaa43\uaa4c\uaa4d\uaa50-\uaa59\uaa7b\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uaaeb-\uaaef\uaaf5\uaaf6\uabe3-\uabea\uabec\uabed\uabf0-\uabf9\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f]*$/;

const renameDictionary = {
    "_0x1bc7": "decode",
    "_0x2295d3": "encodedStrings",
    "_0x521d": "getEncodedStrings",
    "_0x544ee8": "base64Alphabet",
    "_0x127efa": "moduleLoadFunc",
    "_0x802a1d": "throwAwayVar",
    "_0x22c1c9": "moduleObj",
    "_0x5b12ef": "intArray",
    "_0x12b53b": "intArrNumber",
    "_0x16fb58": "objHoldingExports",
    "_0x195b07": "idx",
    "_0x70a222": "modError",
    "_0x3f3694": "moduleLoadFuncParam",
    "_0x5c5ea0": "moduleLoadFuncParam",
    "_0x1dae74": "moduleLoadFuncParam",
    "_0x4579fc": "moduleLoadFuncParam",
    "_0x470e04": "moduleLoadFuncParam",
    "_0x3fd426": "moduleLoadFuncParam",
    "_0x2e6bbe": "moduleLoadFuncParam",
    "_0x4e397f": "ddOptionsModule",
    "_0x29236e": "ddApiClientModule",
    "_0x5d9866": "ddResponseModule",
    "_0x38ec92": "ddToolsModule",
    "_0x1d19af": "objToAttachModuleAttributesTo",
    "_0x222496": "exportObj",
    "_0x2b3568": "ddRequestModule",
    "_0x5aaa52": "ddRequestModule",
    "_0x4dc433": "ddToolsModule",
    "_0x1b0b64": "ddToolsModule",
    "_0x5145b": "newReqModule",
    "_0x38a9d0": "newToolsModule",
    "_0x53a34f": "exportObj",
    "_0x9fb85b": "ddToolsModule",
    "_0x67d8a9": "exportObj",
    "_0x140d0a": "httpClient",
    "_0x165e54": "errMsg",
    "_0x3e8c47": "msgLog",
    "_0x47224b": "ddAnalyzeModule",
    "_0x277ea1": "ddRequestModule",
    "_0x85c7b0": "ddResponseModule",
    "_0x4b4c01": "ddToolsModule",
    "_0x295336": "objToAttachModuleAttributesTo",
    "_0x5a50db": "objToAttachModuleAttributesTo",
    "_0x1eef21": "objToAttachModuleAttributesTo",
    "_0x3c48c9": "objToAttachModuleAttributesTo",
    "_0x392d81": "objToAttachModuleAttributesTo",
    "_0x5a8fdb": "exportObj",
    "_0x1081bf": "newddAnalyzeModule",
    "_0x4669ee": "ajaxListenPath",
    "_0x486a33": "listenPathExclusion",
    "_0x5238ae": "abortAsyncOnCaptcha",
    "_0x21e8e8": "exposeCaptchaFunc",
    "_0x5dba87": "isSalesForce",
    "_0x2a3f7d": "newReqObj",
    "_0x5cfad3": "responseURL",
    "_0x30b236": "ajaxListenPath",
    "_0x32d3cd": "listenPathExclusion",
    "_0x282dc4": "isSalesForce",
    "_0x224665": "httpResponseText",
    "_0x38b62d": "responseHeaders",
    "_0x3fcee3": "abortAsyncOnCaptcha",
    "_0x31c2c7": "exposeCaptchaFunc",
    "_0x77df8e": "responseObj",
    "_0x2ce9c3": "isSalesForce",
    "_0x27a5b6": "responseURL",
    "_0x18c106": "isSalesForce",
    "_0x4878b6": "httpResponseText",
    "_0x6e4b5a": "responseURL",
    "_0x5934e2": "ddjskey",
    "_0x1e4cbe": "objToAttachModuleAttributesTo",
    "_0x3237fa": "array",
    "_0x25c59c": "patternToRemoveFromReferrerUrl",
    "_0xff0a20": "ddResponsePage",
    "_0x27ad89": "callbackFunc",
    "_0x4c34d8": "milliseconds",
    "_0x29a861": "window",
    "_0x1ea61e": "eventType",
    "_0x3b4ee2": "mousePosition",
    "_0x1beef7": "window",
    "_0x4f966b": "eventType",
    "_0x32f205": "mousePosition",
    "_0x3c4138": "windowHref",
    "_0x18e3e5": "cookie",
    "_0xcd5b96": "hostName",
    "_0xe21c3e": "objHoldingEndpoint",
    "_0x1b3501": "exportObj",
    "_0xdbb73": "ddStatusObj",
    "_0x5d49c8": "correlation_id",
    "_0xc2ad5a": "cookieFound",
    "_0x40566a": "cookieToSet",
    "_0x5ea7eb": "regPattern",
    "_0x41fe50": "regPattern",
    "_0x26570c": "stringtoReplace",
    "_0x1fbde8": "localStorageStatus",
    // line 99-func 3
    "_0x3da20e": "urlParam",
    "_0x366d04": "exportObj",
    "_0x55f079": "ddToolsModule",
    "_0x5bb77b": "mobileUACheck",
    "_0x4240eb": "StrToB64",
    "_0x5007fc": "strToEncode",
    "_0x36b8df": "createChallEvent",
    "_0x2f5965": "eventChallName",
    "_0x3e9561": "newEvent",
    "_0x3f3cdd": "contentWindow",
    "_0x5aea26": "getContentWinProps",
    // "_0x36b062": "contentWinPropObj"
    "_0x2fb02a": "selfFuncCalller",
    "_0x5cdeb2": "throwAwayParam",
    "_0x4e3a91": "reqBodyParamObj",
    "_0x18e0e9": "timeSinceScriptStart",
    "_0x500763": "stackErr",
    "_0x638731": "stack",
    "_0x1d8017": "iframeEleme",
    "_0x9b80de": "newDDToolsModule",
    "_0x397281": "alwaysFalseVar",
    "_0x224f84": "index250",
    "_0x2cf086": "windowFetch",
    "_0x3c1b4e": "winFetchCall",
    "_0x28d8f5": "userChall",
    "_0x204134": "respURLModified",
    "_0xd112f6": "newDDToolsModule",
    "_0x57e152": "index",
    "_0x1e0b51": "index",
    "_0x274115": "urlPartsMatch",
    "_0xfc36f8": "parsedJSON",
    "_0x1564fd": "rawJSON",
    "_0x5d34e4": "currentModule",
    "_0x117cca": "windowAttributesObj",
    "_0x32103b": "winURL",
    "_0x584733": "httpReq",
    "_0x5f2da5": "readerObj",
    "_0x44e01c": "index",
    "_0x523f71": "uselessArr",
    "_0x25f3ce": "newDDResponseMod",
    "_0x13f1ed": "eventObj",
    "_0x4d3475": "eventTarget",
    "_0x1ae0a1": "file",
    "_0x35f545": "newDDReqModule",
    "_0x4180e2": "msgChannel",
    "_0x4058b9": "msgEvent",
    "_0x1f240f": "index",
    "_0x3ebf39": "index",
    "_0x41da6e": "eventTypesArr",
    "_0x255715": "newDDToolsModule",
    "_0x5af7b7": "newDDReqModule",
    "_0x3a8348": "mouseEventFunc",
    "_0x21989d": "newMouseEventFunc",
    "_0x24fbc9": "animationFrame",
    "_0x171092": "false1stTime",
    "_0x5f0b3f": "milliseconds",
    "_0x4812d8": "timesEventHappenedObj",
    "_0x3a743e": "eventAmtObj",
    "_0x42493c": "mouseMoveEvent",
    "_0xda5b40": "mouseMoveEvent",
    "_0x158aa1": "mouseEvent",
    "_0x36c386": "timeSinceProgramStart",
    "_0xea4549": "timesMouseMoved",
    "_0x454e01": "index",
    "_0x4e5abb": "mouseX1",
    "_0x40eb34": "mouseY1",
    "_0x1ac85c": "mouseX2",
    "_0x3e5d5d": "mouseY2",
    "_0x35d7bd": "distanceBetweenXs",
    "_0x457ed3": "distanceBetweenYs",
    "_0x5c2bfd": "coordsAngle",
    "_0x36a3b3": "findMouseCoordsAngle",
    "_0x54e5cd": "angleOfCords1",
    "_0xb59ab1": "angleOfCords2",
    "_0x5d73af": "mouseEvent1",
    "_0x5c4c4c": "lastMouseEvent",
    "_0x144206": "lastIndex",
    "_0x520ddf": "lastEvent",
    "_0x32dfc": "firstMouseEvent",
    "_0x1771a3": "mouseEvent1X",
    "_0x5c2e07": "mouseEvent1Y",
    "_0x419607": "lastMouseEventX",
    "_0x501841": "lastMouseEventY",
    "_0x5cbe11": "diffBetween1andLastX",
    "_0x544632": "diffBetween1andLastY",
    "_0x1df65a": "mouseEventArr",
    "_0x22ff61": "intNum50",
    "_0x36be65": "Element2",
    "_0x5e0cf3": "Element1",
    "_0x3a1754": "sortedArr",
    "_0x3886ff": "halfWay",
    "_0x1ea8f4": "halfWayIndex",
    "_0x1eb825": "almostZero",
    "_0x34dee3": "returnMidPointArr",
    "_0x449bc6": "capDeliverURLEnding",
    "_0x118bce": "ddToolsModule",
    "_0x40b1e9": "newDDToolsModule",
    "_0x55c985": "newDDToolsModule",
    "_0x540029": "captchaURLsArr",
    "_0x3cfd56": "ddCookie",
    "_0x3e1e87": "msgEvent",
    "_0x138db2": "eventOrigin",
    "_0x163fd2": "eventParsedJSON",
    "_0x27f493": "wasOnCapSite",
    "_0x4e6d8a": "ddCookie",
    "_0x152671": "capURL",
    "_0x16fd69": "capiFrames",
    "_0x256729": "capiFramesParent",
    "_0x43ee10": "currentDate",
    "_0x12afec": "capiElement",
    "_0x414d16": "eventPropsObj",
    "_0x17d8a2": "parsedCaptcha",
    "_0x4e2da0": "index",
    "_0x27d6ae": "index",
    "_0x5d6834": "EndOfRespIndex",
    "_0x186471": "fixedHTTPResponseText",
    "_0x552cc1": "startIndex",
    "_0x4515fc": "startOfDDRespObj",
    "_0x3a3306": "isStringResp",
    "_0x3fec3b": "parsedJSONObj",
    "_0x13427f": "ddRespJSONURL",
    "_0x2557ee": "startIndex",
    "_0x28019d": "EndOfRespIndex",
    "_0x7ec2bb": "startOfContentID",
    "_0x51e14e": "endOfRespBodyIndex",
    "_0x18669b": "hasURLResp",
    "_0x3dc885": "hasHTMLResp",
    "_0x1cf858": "isURLResp",
    "_0x29e477": "hasDDResp",
    "_0x3074d0": "ddJavaScriptKey",
    "_0xd50624": "isSalesForce",
    "_0x725431": "checkDDKey",
    "_0x417b73": "newDDToolsModule",
    "_0x5b0c37": "parsedJSONResp",
    "_0x29e204": "cookieDomainIndex",
    "_0x189b39": "cookiePathIndex",
    "_0x185520": "cookieDomain",
    "_0x14240a": "isAsync",
    "_0x4f5283": "mouseEvent",
    "_0x1d3b4a": "userAgentLowerCase",
    "_0x311697": "typeOfUserAgent",
    "_0x1eb42b": "operatingSystem",
    "_0x1dc53b": "CPUOperatingSystem",
    "_0x2deddd": "userAgentLowerCase",
    "_0x4c1b18": "typeOfBrowser",
    "_0x35e4a2": "browserUAlength",
    "_0x91122f": "browserWindow",
    "_0x10f5bf": "windowNavigator",
    "_0x278d42": "browserWindow",
    "_0xe2f0c0": "timeSinceScriptStart",
    "_0x15cd8e": "elementObjContext",
    "_0x1185ec": "debugInfoObj",
    "_0xc1430": "debugGPUInfo",
    "_0xc23340": "debugGPUCompanyInfo",
    "_0x4fd9dc": "GPU_Used",
    "_0x43b325": "GPU_Company",
    "_0x5dacaf": "GPU_InfoOBJ",
    "_0x398772": "printObjToString",
    "_0x50bab5": "typeOfObj",
    "_0x196d62": "objectParam",
    "_0x149a90": "contentWinPropObj",
    "_0x2fffd1": "contentWinPropObj",
    "_0x45fa06": "timeSinceScriptStart",
    "_0x770e52": "elementObjContext",
    "_0x2d982f": "debugInfoObj",
    "_0x1bae87": "debugGPUCompanyInfo",
    "_0x321b8b": "debugGPUInfo",
    "_0x58d9d2": "GPU_Company",
    "_0x7c1475": "GPU_Info",
    "_0x252e10": "timeToGetClientInfo",
    "_0x322a57": "timeToGetClientInfo",
    "_0x3e2a49": "GPU_InfoObj",
    "_0x30d85d": "GPU_InfoObjCopy",
    "_0x4963c2": "GPU_InfoObjCopy",
    "_0x38043b": "msToGetCliInfo",
    "_0x172626": "index",
    "_0x151ac7": "newErr",
    "_0x41dbd0": "useCapture",
    "_0xcb5cfe": "useCapture",
    "_0x536986": "funcToolsFunc",
    "_0x5969bc": "windowAttributesForReq",
    "_0x676258": "windowAttributes",
    "_0x343e0e": "webGLBrowserCheck",
    "_0x455b1b": "MouseEveObj",
    "_0x2d0d3d": "eventParam",
    "_0x6fee91": "dispatchEventFunc",
    "_0x87ee35": "checkIfString",
    "_0xddf451": "objPrototype",
    "_0x440b6a": "objPrototypeStack",
    "_0x12dd0f": "reqBodyParamObj",
    "_0x438248": "videoElement",
    "_0x4d859c": "audioElement",
    "_0x7a3da2": "index",
    "_0x26cfc0": "index",
    "_0x50e03f": "mediSource",
    "_0x33b574": "mediSource",
    "_0x37a8cc": "hasDeviceMemory",
    "_0x421d8a": "hasBrowserBuildID",
    "_0x4bebdb": "intNum50",
    "_0xa519ff": "funcCaller",
    "_0x4a810c": "errMsg",
    "_0x5403a6": "wantedErrMsg",
    "_0x27063a": "pluginType",
    "_0x3f4629": "nav_plugins",
    "_0x517675": "checkNavPluginsPostMsg",
    "_0x27f016": "seleniumDriverArr1",
    "_0x10809e": "seleniumDriverArr2",
    "_0x4a3337": "index",
    "_0x243fd8": "intervalFunc",
    "_0x5b873c": "index",
    "_0x25c280": "mousePositionTimeStamp",
    "_0x23188e": "mouseEventObj",
    "_0x8f5c6e": "removeMousePsEvents",
    "_0xd9b3a7": "mouseEventObj",
    "_0x261be3": "mouseEventObj",
    "_0x33a42a": "mouseEventTarget",
    "_0x2a75a1": "dispatchEventFunc",
    "_0xac9b37": "browserFlowContainer",
    "_0xc3aa84": "browserFlowStatusElement",
    "_0x376d65": "browserFlowEleCheckFunc",
    "_0x106fb8": "stringToEncode",
    "_0x53bf5d": "strToB64Func",
    "_0x3b027a": "hasMobileUAFunc",
    "_0x2e0e0c": "newEvent",
    "_0x5d5c76": "eventChallName",
    "_0x48fe88": "createChallEvent",
    "_0x10dcad": "msToGetClientInfo",
    "_0x3d0e9e": "newErr",
    "_0x5d9fc8": "index",
    "_0x790e14": "windowAttributesForReq",
    "_0x580bb6": "browserWindow",
    "_0x15c66f": "windowNavigator",
    "_0x2e4c12": "webGLBrowserCheck",
    "_0x5c7b46": "getContentWinProps",
    "_0x526412": "contentWindow",
    "_0x5bbb8c": "mouseEventObject",
    "_0x320d2b": "callBackFunc",
    "_0x3ff2e0": "throwawayParam",
    "_0x19d1bf": "milliseconds",
    "_0x1f8e9b": "selfFuncCaller",
    "_0x1a942d": "timeSinceScriptStart",
    "_0x39450a": "iFrameEleme",
    "_0x293103": "windowAttributes",
    "_0x56ca4e": "contentWinPropObj",
    "_0x599283": "checkIfString",
    "_0x1f163f": "objPrototype",
    "_0x5b0469": "objPrototypeStack",
    "_0x2ff463": "printObjToString",
    "_0x5045a9": "typeOfObj",
    "_0x3da9f1": "objectParam",
    "_0x10de2f": "userAgentLowerCase",
    "_0xa28863": "browserUALength",
    "_0xc52d27": "userAgentLowerCase",
    "_0x24be95": "CPUOperatingSystem",
    "_0x294295": "operatingSystem",
    "_0x5b892d": "typeOfUserAgent",
    "_0x54c51e": "typeOfBrowser",
    "_0x5539a6": "index",
    "_0x387309": "audioElement",
    "_0x180646": "mediaSource",
    "_0x53bea5": "videoElement",
    "_0x25ee95": "mediaSource",
    "_0x55f802": "hasDeviceMemory",
    "_0x150745": "hasBrowserBuildID",
    "_0x30fa11": "intNum50",
    "_0x1f3826": "funcCaller",
    "_0x2d2c19": "checkNavPluginsPostMsg",
    "_0x30ebc4": "nav_plugins",
    "_0x272ebb": "pluginType",
    "_0x9d09b3": "errMsg",
    "_0xa464f6": "wantedErrMsg",
    "_0x2fd289": "seleniumDriverArr1",
    "_0x27d4ce": "seleniumDriverArr2",
    "_0x16550e": "index",
    "_0x50202c": "index",
    "_0x4ccaa5": "index",
    "_0x1573c4": "intervalFunc",
    "_0x2217ff": "mousePositionTimeStamp",
    "_0x118237": "mouseEventObj",
    "_0x2d6238": "removeMousePsEvents",
    "_0x24be3c": "browserFlowContainer",
    "_0x1c1245": "browserFlowEleCheckFunc",
    "_0x120115": "browserFlowStatusElement",
    "_0x11a594": "mouseEventObj",
    "_0x59472d": "mouseEventTarget",
    "_0x1a4303": "contentWinPropObj",
    "_0x47c26f": 'errStack',
    "_0x17dc92": "canvasElement",
    "_0xda00a0": "canvasElement",
    "_0xafefc9": "iframeEleContentWinNav",
    "_0x59d64e": "iframeEleContentWinNav",
    "_0x40b39d": "iframeEleOSPlatform",
    "_0x111ec3": "iframeEleOSPlatform",
    "_0x51c845": "userWinOSPlatform",
    "_0x2fce94": "userWinOSPlatform",
    "_0x3b97df": "winAttributesObjiFrame",
    "_0x1ac12a": "winAttributesObjiFrame",
    "_0x111fd6": "errStack",
    "_0x4a05a4": "errStack",
    "_0x4a2e04": "errStackLength",
    "_0x7e7e35": "errStackLength",
    "_0x5c780b": "errStackLength",
    "_0x3edd61": "errStackLength",
    "_0x25c2eb": "errStackRegexApplyEle",
    "_0x34ce73": "errStackRegexCodeExecution",
    "_0x4fccb0": "errStackPuppeteer",
    "_0x57b50f": "errStackPuppeteer",
    "_0x4e4efe": "errStackRegexCodeExecution",
    "_0x2317e3": "errStackRegexApplyEle",
    "_0x236d1c": "errStackLength",
    "_0x539659": "errStackLength",
    "_0x1816cd": "errStackLength",
    "_0x409a7f": "errStackLength",
    "_0x1eb456": "checkRangeErrFunc",
    "_0x4cb8d9": "checkRangeErrFunc",
    "_0xe26795": "returnedErr",
    "_0x66cfd7": "ObjErr",
    "_0x593d2a": "returnedErr",
    "_0x58f016": "returnedErr",
    "_0x161f8d": "iFrameEle",
    "_0x4a7bec": "iFrameEle",
    "_0xdaf72b": "iFrameEle",
    "_0x17356a": "iFrameEle",
    "_0x3aa0fc": "returnedErr",
    "_0xb8015e": "returnedErr",
    "_0x298711": "returnedErr",
    "_0x3fe1c0": "webpageElementFuncsArr",
    "_0x5479e1": "webpageFunc",
    "_0x25511f": "cachedItem",
    "_0x194c03": "webpageElementFuncsArr",
    "_0x41f6c5": "webpageFunc",
    "_0x48dfdd": "cachedItem",
    "_0x16d2af": "reqContainsErr",
    "_0x423ac1": "reqContainsErr",
    "_0xf5d2cd": "eventObj",
    "_0x58c746": "webDriverEventFunc",
    "_0x5e544d": "webDriverEventFunc",
    "_0x1693d9": "eventObj",
    "_0xbe2d85": "index",
    "_0x409eb7": "objToAttachModuleAttributesTo",
    "_0x2a436d": "array",
    "_0x586a8e": "ddJSKey",
    "_0x247684": "patternToRemoveFromReferrerUrl",
    "_0x450538": "ddResponsePage",
    "_0x519d76": "isTrue",
    "_0xb4eeb": "newDDToolsModule",
    "_0x5ac03e": "ddCookie",
    "_0xfd1bf2": "jsDataStr",
    "_0x2ffaa0": "startIdxJSData",
    "_0x47ec24": "jsDataLength",
    "_0x38ecad": "moduleAttribute",
    "_0x1d8035": "modAttrEncodedLength",
    "_0x381711": "index",
    "_0x538dcb": "objsToStoreModAttrs",
    "_0x21f31f": "modAttrArrObj2",
    "_0xc2ce8b": "modAttrArrObj1",
    "_0x482560": "trueIfJsDataOver24000",
    "_0x4749e5": "respHeader",
    "_0x1c89ed": "exportObj",
    "_0x4fef82": "hasRespHeaders",
    "_0x71fd44": "captchaURL",
    "_0x4664dc": "queryStr",
    "_0xfd7f2f": "searchParams",
    "_0x1830e0": "documentgetEleFunc",
    "_0x3cc0a4": "testDocumentEleFuncs",
    "_0x46f784": "chromeMetricsAttrs",
    "_0x1d1eb6": "allChromeMetrics",
    "_0x359d2b": "allChromeMetrics",
    "_0x5357a1": "chromeMetricsAttrs",
    "_0xf80158": "index",
    "_0x3659f3": "docTypesBrowserSupportArr",
    "_0x1f332e": "docTypesBrowserSupportArr",
    "_0x1e5a03": "iFrameWinAttrIndex",
    "_0x391211": "iFrameWinAttrIndex",
    "_0x333cb1": "iFrameWinAttrValsArr",
    "_0x5906c6": "iFrameWinAttrKeyIndexesArr",
    "_0x2bdbda": "iFrameWinAttrValsArr",
    "_0x2b564b": "iFrameWinAttrKeyIndexesArr",
    "_0x2000ab": "iFrameWinAttrObj1",
    "_0x4ca304": "iFrameWinAttrObj2",
    "_0xdd79ea": "iFrameWinAttrObj1",
    "_0x45a7c2": "iFrameWinAttrObj2",
    "_0x4f5b66": "getIframeAttrKeyIndexes",
    "_0x4a03f6": "getIframeAttrKeyIndexes",
    "_0x4fa201": "responseURLwProtocol",
    "_0x8cd9aa": "serverListenPath",
    "_0x2d2fac": "URLProtocolEnding",
    "_0x5e6948": "indexOfURNStart",
    "_0x1a1d78": "responseURN",
    "_0x23967f": "URNSubdirectoryStartIDX",
    "_0x5861c5": "URNDomainEnding",
    "_0x438f25": "URNQueryStartIDX",
    "_0x1d5b26": "URNFragIdentifierStartIDX",
    "_0x288c6f": "URNSubDirIndexElse0",
    "_0x3ace00": "URNQuery",
    "_0x1f34ac": "URNResourceSubDirectory",
    "_0x214fb5": "URNDomain",
    "_0x1e638b": "URLDomainEndingIDX",
    "_0x26a0d9": "URNFragmentIdentifier",
    "_0x4a3700": "webPageCustomEvent",
    "_0x2e947a": "eventNameType",
    "_0x30c3d7": "eventDetails",
    "_0x3f8e4c": "eventName",
    "_0x4e3709": "newCustomEvent",
    "_0x31bfbf": "exportObj",
    "_0x8b9e44": "finalWebGLPassFunc",
    "_0x1e75ce": "finalWebGLPassFunc",
    "_0x5f3758": "errBoolean",
    "_0x551f56": "checkIfErr",
    "_0x24ff30": "errProps",
    "_0x221a6e": "msDecimalIndex",
    "_0x1b8310": "usedForDecimalLength",
    "_0x5e17e8": "msDecimalIndex",
    "_0x1adfc0": "errBoolean",
    "_0x2384cd": "checkIfErr",
    "_0x379bb9": "usedForDecimalLength",
    "_0x615d19": "errProps",
    "_0x2113df": "browserWindow",
    "_0x83fe97": "plugInNames",
    "_0x1eb7e1": "plugInNames",
    "_0x5246a7": "testDocumentEleFuncs",
    "_0x301359": "documentGetEleFunc",
    "_0xd09176": "allDocElesWork",
    "_0x4f5a28": "allDocElesWork",
    "_0x353435": "mouseMovementCalcs",
    "_0x460bfe": "mouseMovementCalcs",
    "_0x119c1d": "eventParam",
    "_0xf31332": "exportAttrVal",
    "_0x3aa956": "moduleAttrKey",
    "_0x1296e2": "notificationsObj",
    "_0x20588f": "returnedErr",
    "_0x58185f": "notificationsObj",
    "_0x1046bc": "queryStr",
    "_0x43af10": "exportObj",
    "_0x462499": "hasRespHeaders",
    "_0x26ba26": "msgCaptEvent",
    "_0x3deef7": "parsedJSONText",
    "_0x6c317d": "safariUAHeightProp",
    "_0x59cb79": "msgEleDiv",
    "_0x53b020": "msgEleDivNotiFrame",
    "_0x6980c6": "mouseMoveTimeStampLog",
    "_0x1a756c": "allTimeStampsLog",
    "_0xa4af6f": "allTimeStampsLoggedSqed",
    "_0x232c01": "callBackFunc",
    "_0xb2abb4": "mouseEventMidPointArrCallbackFunc",
    "_0xd2848b": "useCapture",
    "_0x39ea2c": "mousePosition",
    "_0x43d0a0": "mouseEventMoveObj",
    "_0x4e854d": "isAsync",
    "_0x5b7d20": "index",
    "_0x168728": "mouseEventsIdx",
    "_0x307018": "attachMouseEventsToAttrObj",
    "_0x4efade": "validMousePosition",
    "_0x41c8fd": "checkMouseEveEvery10sec",
    "_0xa00f10": "hasAnimationFrames",
    "_0x218666": "mouseEvent",
    "_0x2a851a": "ddCaptchaMsgHandling",
    "_0x1a835f": "ddCookiewRegex",
    "_0xc4c271": "isNull",
    "_0x4e013c": "ddEndpoint",
    "_0x2452b0": "analyticsObj",
    "_0x727e30": "listenerPath",
    "_0x20109d": "listenerPathType",
    "_0x30b275": "listenPathURLObjinArr",
    "_0x18a7ab": "index",
    "_0x2f753a": "listenerPathLiteral",
    "_0x3971b7": "listenerPathLiteralType",
    "_0x51f2e3": "listenerPathLiteralURLObj",
    // "_0x5b265a": "showingbreak"
}

const renameDictionary2 = {
    "_0x4fad3c": "DictModForModule3",
    "_0x542acf": "DictModForModule4",
    "_0x4ae122": "DictModForModule5",
    "_0x4749f3": "DictModForModule6",
    "_0x226003": "DictModForModule7",
    "_0x2b87fa": "DictModForModule8",
    "_0x2624c3": "DictModForModule9",
    "_0x41c370": "emptyExportsObj",
    "_0x5b265a": "NAObjAttrs",
    "_0x36b062": "contextWinPropsObj",
    "_0x25652b": "notificationsObj",
    "_0x1f1b49": "mouseCoordObj",
    "_0x37c1ec": "NAObjAttrs",
    "_0x84a922": "contextWinPropsObj",
    "_0x3cb6c3": "notificationsObj",
    "_0x48b9a3": "mouseCoordObj",
    "_0x9bda00": "HttpReqContentTypeObj",
    "_0x1fdd73": "objStoreModAttr1",
    "_0x4ee7f6": "objStoreModAttr2",
    "_0x1508f0": "objStoreModAttr3",
    


}

module.exports = {validIdentifierRegex, renameDictionary, renameDictionary2};