module.exports = function (grunt) {
  "use strict";

  grunt.initConfig({
    meta: {
      now: Date.now()
    },
    pug: {
      debug: {
        options: {
          debug: true
        },
        files: [{
          expand: true,
          cwd: "views",
          src: "*.pug",
          dest: ".",
          ext: ".html"
        }]
      },
      release: {
        options: {
          debug: false,
          data: {
            commit: grunt.option("commit")
          }
        },
        files: [{
          expand: true,
          cwd: "views",
          src: "*.pug",
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
        files: ["views/**/*.pug", "public/style/**/*.styl", "content.json", "public/js/**/*.js"],
        tasks: ["pug:debug", "stylus:debug"]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-pug");
  grunt.loadNpmTasks("grunt-contrib-stylus");
  grunt.loadNpmTasks("grunt-contrib-watch");

  grunt.registerTask("default", ["pug:debug", "stylus:debug", "watch:debug"]);
  grunt.registerTask("dev", ["pug:debug", "stylus:debug"]);
  grunt.registerTask("release", ["pug:release", "stylus:release"]);
};
