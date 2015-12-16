var appRoot = '../';
var buildDir = appRoot + 'buildStatic';
var tmpDir = appRoot + 'tmp';


module.exports = {
  appRoot : appRoot ,
  buildDir : buildDir,
  tmpDir : tmpDir,
  browsersync: {
    staticServer: {
      server: {
        baseDir: appRoot,
        directory: true
      },
      port: 9000,
      files: [
        appRoot + 'Content/css/**/*.css',
        appRoot + '/Scripts/**/*.js',
        appRoot + 'Content/images/**',
        appRoot + 'views/**/*.html',
      ]
    },
    //代理.net开发环境
    proxy: {
      port: 9999,
      proxy: {
          baseDir: appRoot,
          target: 'http://www.shiwangyun.com'
      },
      files: [
        appRoot + 'Content/css/**/*.css',
        appRoot + '/Scripts/**/*.js',
        appRoot + 'Content/images/**',
        appRoot + 'views/**/*.cshtml'
      ]
    }
  },
  less:{
    src: appRoot + '/Content/less/**/*.less',
    dest: appRoot +'/Content/css/'
  },
  watch:{
    sprites: appRoot + "Content/images/sprites/**/*.png",
    less: appRoot +'Content/less/**/*.less'
  },
  delete:['concat','transport', buildDir, tmpDir],
  optimize:{
    css : {
      src: [tmpDir +'/Content/**/*.css',tmpDir + '/Scripts/**/*.css'],
      dest: buildDir
    },
    js:{
      src: [tmpDir +'/Content/**/*.js',tmpDir + '/Scripts/**/*.js'],
      dest:  buildDir,
      options: {}
    },
    images: {
      src:   [tmpDir +'/Content/**/*.{jpg,jpeg,png,gif}',tmpDir + '/Scripts/**/*.{jpg,jpeg,png,gif}'],
      dest: buildDir,
      options: {
        optimizationLevel: 3,
        progessive: true,
        interlaced: true
      }
    },
  }
};
