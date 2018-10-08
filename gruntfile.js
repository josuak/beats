module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

   /* copy: {
      t1: {
        src: 'js/*',
        dest: 'build/',
      },
    }, */
    
    uglify: {
      t1: {
        files: {
          'build/all.min.js' : ['js/scrolling.js',
                                'js/dropdown-box.js',
                                'js/interactive-icons.js',
                                'js/slider.js',
                                'js/get-url-var.js',]
        }
      }
    },
    
    'jquery-ready': {
      path: 'build/all.min.js',
      runSync: false,
    },
    
    cssmin: {
      target: {
        files: {
          'build/all.min.css': ['css/main.css',
                                'css/header.css',
                                'css/licensing.css',
                                'css/mission.css',
                                'css/nav.css',
                                'css/qna.css',
                                'css/social.css',
                                'css/store.css',]
        }
      }
    },

    watch: {
      scripts: {
        files: ['js/*.js'],
        tasks: ['uglify', 'jquery-ready'],
        options: {
          spawn: false,
        }
      },
      styles: {
        files: ['css/*.css'],
        tasks: ['cssmin'],
        options: {
          spawn: false,
        }
      }
    }
  });

  // Set default task(s)
  grunt.registerTask('default', ['uglify', 'jquery-ready', 'cssmin']);
  
  // Load grunt plugins
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify-es');
  grunt.loadNpmTasks('grunt-jquery-ready');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
};
