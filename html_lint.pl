#!/usr/bin/env perl

use strict;
use HTML::Lint;

if (@ARGV == 0) { die("You must provide a file to lint.\n"); }

my $linter = HTML::Lint->new;
my $numerrors = 0;

foreach my $arg (@ARGV) {
    $linter->parse_file($arg) or die("Cannot lint file: ", $arg, "\n");

    if ($linter->errors > 0) {
        $numerrors += scalar($linter->errors);

        foreach my $error ($linter->errors) {
            print $arg, ": ", $error->errtext(), " at ", $error->where(), "\n";
        }
    } else {
        print $arg, " ok.\n";
    }
}

if($numerrors > 0) {
    print "-----------------\n";
    print "Total Errors: ", $numerrors, "\n";
    exit 1;
} else {
    print "-----------------\n";
    print "No errors found.\n";
    exit 0;
}