/*global desc, task, jake, fail, complete, namespace */

(function() {
  'use strict';

  task('default', ['lint']);

  desc('Lint our layouts, views, and templates');
  task('lint', function() {
    var files = new jake.FileList();
    //including all 3 lines below may be overkill,
    //  but it helps illustrate some options
    files.include('index.html');
    files.include('src/*.html');
    files.include('src/**/*.html');
    //don't lint our tests
    files.exclude('test');
    
    var fileNames = files.toArray();
    var perlLintCmds = [ 'perl ./html_lint.pl ' + fileNames.join(' ') ];
    
    var exec = jake.createExec(perlLintCmds, { stdout: true });
    
    exec.addListener('cmdEnd', function() {
      //since we only execute 1 command we don't need to count the number
      //  of commands to determine when we're done.
      complete();
    });
    
    exec.addListener('error', function(msg, code) {
      //just add a blank space to make the output more readable
      console.log('');
      //fail the Jake test
      fail(msg, code);
      complete();
    });
    
    exec.run();
    
  }, {async: true});
}());