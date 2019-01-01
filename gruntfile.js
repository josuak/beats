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
          'build/js/all.min.js' : ['js/scrolling.js',
                                'js/dropdown-box.js',
                                'js/interactive-icons.js',
                                'js/slider.js',
                                'js/get-url-var.js',
                                'js/contact.js',]
        }
      }
    },
    
    'jquery-ready': {
      path: 'build/js/all.min.js',
      runSync: false,
    },
    
    cssmin: {
      target: {
        files: {
          'build/css/all.min.css': ['css/main.css',
                                  'css/nav.css',
                                  'css/header.css',
                                  'css/store.css',
                                  'css/licensing.css',
                                  'css/qna.css',
                                  'css/mission.css',
                                  'css/social.css',
                                  'css/contact.css',
                                  'css/footer.css',]
        }
      }
    },
    
    htmlmin: {                                     // Task
      dist: {                                      // Target
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true,
          minifyJS: true,
          minfiyCSS: true
        },
        files: {                                   // Dictionary of files
          'build/index.html': 'index.html'         // 'destination': 'source'
        }
      }
    },
    
    copy: {
      js: {
        files: [
          {src: "build/js/all.min.js", dest: "js/all.min.js"},
        ]
      },
      css: {
        files: [
          {src: "build/css/all.min.css", dest: "css/all.min.css"},
        ]
      }
    },

    watch: {
      scripts: {
        files: ['js/*.js'],
        tasks: ['js'],
        options: {
          spawn: false,
        }
      },
      styles: {
        files: ['css/*.css'],
        tasks: ['css'],
        options: {
          spawn: false,
        }
      },
      markup: {
        files: ['*.html'],
        tasks: ['htmlmin'],
        options: {
          spawn: false,
        }
      }
    }
  });

  // Set default task(s)
  grunt.registerTask('default', ['uglify', 'jquery-ready', 'cssmin', 'htmlmin', 'copy']);
  grunt.registerTask('js', ['uglify', 'jquery-ready','copy:js']);
  grunt.registerTask('css', ['cssmin', 'copy:css']);
  
  // Load grunt plugins
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify-es');
  grunt.loadNpmTasks('grunt-jquery-ready');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
};
