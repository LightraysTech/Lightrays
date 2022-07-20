import os

baseFile = 'scripts/LR.ts'
outputPath = 'scripts/packaged.ts'

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
                fileName = line.split("from \"")[1].split("\";")[0] + ".ts"
                fileName = fileName.replace("./", os.path.dirname(file) + "/")
                importFiles.append(fileName)

                subImports = getImports(fileName, True)
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
print(outputFileContent)

f = open(outputPath, "w")
f.write(outputFileContent)
f.close()