'use strict'
const fs = require('fs')
const { globSync } = require('glob')
const path = require('path')
const shelljs = require('shelljs')

class UselessFilesCleanPlugin {
  public rootPath: string = ''
  private opts: any = {}
  constructor (options: any = {}) {
    this.opts = options
  }
  apply (compiler:any) {
    compiler.plugin('after-emit', (compilation:any, done:any)=> {
      this.findUnusedFiles(compilation, this.opts)
      done()
    })
  }
/**
 * 获取依赖的文件
 */
  getDependFiles (compilation:any) {
    return new Promise((resolve, reject) => {
      const dependedFiles = [...compilation.fileDependencies].reduce(
        (acc, usedFilepath) => {
          if (!~usedFilepath.indexOf('node_modules')) {
            acc.push(usedFilepath)
          }
          return acc
        },
        []
      )
      resolve(dependedFiles)
    })
  }

/**
 * 获取项目目录所有的文件
 */
  getAllFiles (pattern:any) {
    return new Promise((resolve, reject) => {
      const files =  globSync(pattern,{
        nodir: true,
      })
      const out = files.map((item:any) => path.resolve(item))
      resolve(out)
    })
  }
  // 过滤忽略的文件夹
  dealExclude (path:any, unusedList:any) {
    let index = this.rootPath.length;
    const result = unusedList.filter((unused:any) => (unused.indexOf(`\\${path}\\`) < index  && unused.indexOf(`/${path}/`) < index))
    return result
  }
  // 查找需要删除的冗余文件
  async findUnusedFiles (compilation:any, config = {root:String,clean:Boolean,output:String,exclude:Array,ignoreFile:Array}) {
    const { root  = './src', clean = false, output = './unused-files.json', exclude = [],ignoreFile = [] } = config
    const pattern = root + '/**/*'
    this.rootPath = path.join(process.cwd(), root);
    try {
      const allChunks:any = await this.getDependFiles(compilation)
      const allFiles:any = await this.getAllFiles(pattern)
      let unUsed = allFiles
        .filter((item:any) => !~allChunks.indexOf(item))
      if (Array.isArray(exclude) && exclude.length > 0) {
        exclude.forEach((path:string)=>{
          unUsed = this.dealExclude(path, unUsed)
        })
      }
      // 过滤指定后缀名称
      if(Array.isArray(ignoreFile) && ignoreFile.length >0){
        ignoreFile.forEach((file:string)=>{
          unUsed = unUsed.filter((path:any)=> !(path.indexOf(file) > -1 && path.indexOf(file) === (path.length - file.length)))
        })
      }
      if (typeof output === 'string') {
        fs.writeFileSync(output, JSON.stringify(unUsed, null, 4))
      } else if (typeof output === 'function') {
        output(unUsed)
      }
      console.log("unUsed=====",unUsed)
      if (clean) {
        unUsed.forEach((file:any) => {
          shelljs.rm(file)
          console.log(`remove file: ${file}`)
        })
      }
      return unUsed
    } catch (err) {
      throw (err)
    }
  }
}

module.exports = UselessFilesCleanPlugin