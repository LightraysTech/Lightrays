import os

baseFile = 'scripts/LR.ts'
outputPath = 'scripts/packaged.ts'

baseFile = os.path.abspath(baseFile)

print("\n-------------TsPackager-------------\n")

class JsImportData:
    def __init__(self, filePath, member, moduleName):
        self.filePath = filePath
        self.member = member
        self.moduleName = moduleName


def getImports(file, recursive):
    importFiles = []
    with open(file) as f:
        lines = f.readlines()
        for line in lines:
            if(line.startswith("import")):
                importFilePath = line.split("from \"")[1].split("\";")[0] + ".ts"
                importFilePath = os.path.join(os.path.dirname(os.path.abspath(file)),importFilePath)
                importFilePath = os.path.normpath(importFilePath)
                if(not(importFilePath in importFiles) and not(importFilePath == baseFile)):
                    importFiles.append(importFilePath)
                    subImports = getImports(importFilePath, True)
                    if(len(subImports) != 0):
                        importFiles.extend(subImports)

    return importFiles

imports = getImports(baseFile, True)
imports = list(dict.fromkeys(imports)) # remove duplicates
imports.append(baseFile)
print(imports)

outputFileContent = ""
for file in imports:
    outputFileContent += "//#region \"" + file + "\"\n"
    with open(file) as f:
        lines = f.readlines()
        for line in lines:
            if(not(line.startswith("import"))):
                outputFileContent += line
    outputFileContent += "\n//#endregion\n"

outputFileContent = outputFileContent.replace("export ", "")
outputFileContent = outputFileContent.replace("default ", "")
#print(outputFileContent)

f = open(outputPath, "w")
f.write(outputFileContent)
f.close()