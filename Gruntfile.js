module.exports = function(grunt) {

	grunt.initConfig({

		mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          //captureFile: 'results.txt', // Optionally capture the reporter output to a file
          //quiet: false, // Optionally suppress output to standard out (defaults to false)
          //clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
        },
        src: ['tests/**/*.js', 'answers/**/*.js', 'test.js']
      }
    },

	  watch: {

			mochaTest: {
				files: ['answers/**/*.js','tests/**/*.js','test.js'],
				tasks: ['mochaTest']
			}
	  }
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.registerTask('default', ['watch']);
};
