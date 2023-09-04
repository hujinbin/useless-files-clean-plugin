
const fs = require('fs')
const glob = require('glob')
const path = require('path')
const shelljs = require('shelljs')

class UselessFilesCleanPlugin {
  private opts:string = ''
  constructor (options:any) {
    this.opts = options
  }
  apply (compiler:any) {
    compiler.plugin('after-emit', (compilation:any, done:any)=> {
      done()
    })
  }
}

module.exports = UselessFilesCleanPlugin