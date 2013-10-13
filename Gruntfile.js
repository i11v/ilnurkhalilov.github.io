module.exports = function (grunt) {
  "use strict";

  var content = grunt.file.readJSON("content.json");

  grunt.initConfig({
    meta: {
      now: Date.now()
    },
    jade: {
      debug: {
        options: {
          debug: true,
          data: content
        },
        files: [{
          expand: true,
          cwd: "views",
          src: "*.jade",
          dest: ".",
          ext: ".html"
        }]
      },
      release: {
        options: {
          debug: false,
          data: content
        },
        files: [{
          expand: true,
          cwd: "views",
          src: "*.jade",
          dest: ".",
          ext: ".html"
        }]
      }
    },
    stylus: {
      debug: {
        options: {
          compress: false
        },
        files: {
          "public/build/main.css": "public/style/main.styl"
        }
      },
      release: {
        options: {
          compress: true
        },
        files: {
          "public/build/main.css": "public/style/main.styl"
        }
      }
    },
    watch: {
      debug: {
        options: {
          livereload: true
        },
        files: ["views/**/*.jade", "public/style/**/*.styl", "content.json", "public/js/**/*.js"],
        tasks: ["jade:debug", "stylus:debug"]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-jade");
  grunt.loadNpmTasks("grunt-contrib-stylus");
  grunt.loadNpmTasks("grunt-contrib-watch");

  grunt.registerTask("default", ["jade:debug", "stylus:debug", "watch:debug"]);
  grunt.registerTask("dev", ["jade:debug", "stylus:debug"]);
  grunt.registerTask("release", ["jade:release", "stylus:release"]);
};
