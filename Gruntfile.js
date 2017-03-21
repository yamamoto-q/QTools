module.exports = function(grunt) {
    grunt.initConfig({
        copy: {
            html: {
                files: [
                    { expand: true, cwd: 'src/html/', src: ['index.html'], dest: 'dist/', filter: 'isFile' }
                ]
            },
            js: {
                files: [
                    { expand: true, cwd: 'src/js/', src: ['QTools.js'], dest: 'dist/js/', filter: 'isFile' }
                ]
            }
        },
        less:{
            dist: {
                options: {
                    compress: false
                },
                files: [
                    {"dist/css/style.css": "src/css/style.less"},
                ]
            }
        },
        babel: {
            options: {
                plugins: ['transform-react-jsx'],
                presets: ['es2015', 'react']
            },
            app: {
                files: [
                    { 'src/js/react/AppEntry.js': 'src/js/react/jsx/AppEntry.jsx' },
                    { 'src/js/react/QTools.js': 'src/js/react/jsx/QTools.jsx' },
                    { 'src/js/react/InputAuthForm.js': 'src/js/react/jsx/InputAuthForm.jsx' },
                    { 'src/js/react/Header.js': 'src/js/react/jsx/Header.jsx' },
                    { 'src/js/react/Avater.js': 'src/js/react/jsx/Avater.jsx' },
                    // Bootstrap
                    { 'src/js/react/Bootstrap_FormGroup.js': 'src/js/react/jsx/Bootstrap/formGroup.jsx' },
                    { 'src/js/react/Bootstrap_FormLabel.js': 'src/js/react/jsx/Bootstrap/formLabel.jsx' },
                    { 'src/js/react/Bootstrap_FormInput.js': 'src/js/react/jsx/Bootstrap/formInput.jsx' },
                    { 'src/js/react/Bootstrap_Button.js': 'src/js/react/jsx/Bootstrap/button.jsx' },
                ]
            }
        },
        browserify: {
            app: {
                files: {
                    'src/js/QTools.js': ['src/js/react/AppEntry.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('_Dev', ['copy:html', 'less', 'babel', 'browserify', 'copy:js']);
};