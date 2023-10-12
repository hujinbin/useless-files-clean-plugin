'use strict'
const fs = require('fs')
const { globSync } = require('glob')
const path = require('path')
const shelljs = require('shelljs')

class UselessFilesCleanPlugin {
  private opts: any = {}
  constructor (options: any = {}) {
    this.opts = options
    console.log(this.opts)
  }
  apply (compiler:any) {
    compiler.plugin('after-emit', (compilation:any, done:any)=> {
      console.log(22222222)
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
    console.log("getAllFiles====")
    console.log(pattern)
    return new Promise((resolve, reject) => {
      const files =  globSync(pattern)
      const out = files.map((item:any) => path.resolve(item))
      resolve(out)
    })
  }
  // 过滤忽略的文件
  dealExclude (path:any, unusedList:any) {
    console.log(path,unusedList)
    const file = fs.readFileSync(path, 'utf-8')
    const files = JSON.parse(file) || []
    const result = unusedList.filter((unused:any) => {
      return !files.some((item:any) => ~unused.indexOf(item))
    })
    return result
  }
  // 查找需要删除的冗余文件
  async findUnusedFiles (compilation:any, config = {root:String,clean:Boolean,output:String,exclude:Array,ignoreFile:Array}) {
    const { root  = './src', clean = false, output = './unused-files.json', exclude = [],ignoreFile = [] } = config
    console.log(root, clean, output, ignoreFile)
    const pattern = root + '/**/*'
    try {
      const allChunks:any = await this.getDependFiles(compilation)
      const allFiles:any = await this.getAllFiles(pattern)
      let unUsed = allFiles
        .filter((item:any) => !~allChunks.indexOf(item))
      if (exclude.length > 0) {
        unUsed = this.dealExclude(exclude, unUsed)
      }
      console.log(unUsed)
      // 过滤指定后缀名称
      if(Array.isArray(ignoreFile) && ignoreFile.length >0){
        ignoreFile.forEach((file:string)=>{
          unUsed = unUsed.filter((path:any)=> !(path.indexOf(file) > -1 && path.indexOf(file) === (path.length - file.length)))
        })
      }
      console.log(unUsed)
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