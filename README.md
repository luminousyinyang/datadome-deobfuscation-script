# DataDome-Deobfuscation-Script

### Preface
The purpose of this little project was to start my learning journey in the reverse engineering. I had to read a good amount to teach myself how to reverse engineer deobfuscation like this prior to giving this project a try. But as always the best way to learn is with hands on practice so thats what this is for me.

Anyways... There is really 2 parts to this script. The deobfuscator itself which is in the main directory and is called "deobScript.js" and the deobfuscated script under the "deobfuscated" subdirectory. The deobfuscated script has fully renamed variables that are renamed to a human readable version that tries to explain the variable's purpose. The purpose of that was to try and give me a good visualization of the script, since human readable references are easier to understand. 

* important note regarding renaming though, since I implemented it via a hardcoded dictionary of hexadecimal to human-readable vars. It wont rename on any version other than version 4.6.11. Since the hexadecimal vars change on every update. There is better ways to do this but for the sake of time and this project just being practice, I figured this would be fine. 

### How To use
Pretty much just make sure you have nodeJS installed. If not you can install it here https://nodejs.org/. 
Then run it with the "node ./deobScript.js" command in the command line.
