#!/usr/bin/env python3
import getopt, sys

def comperaVersion(v1, v2, separator):
    #brake versions into lists;
    if v1 == v2:
        return 0
    v1_level_list = v1.split(separator)
    v2_level_list = v2.split(separator)
    #Incase lists have differente legth
    v1_level_list.append(0)
    v2_level_list.append(0)
    #Compare every level until find a difference
    for index, v1_level in enumerate(v1_level_list):
        v2_level = v2_level_list[index]
        if int(v1_level) > int(v2_level):
            return 1
        if int(v1_level) < int(v2_level):
            return -1

if __name__ == "__main__":
    version1 = None
    version2 = None
    separator = "."
    try:
        options, args = getopt.getopt(sys.argv[1:], "v:c:s:h")
        for opt, arg in options:
            if opt == '-h':
                print('./compareVersions.py -v [version 1] -c [version 2]')
                sys.exit(0)
            if opt == '-v':
                version1 = arg
            if opt == '-c':
                version2 = arg
            if opt == '-s':
                separator = arg

        print(comperaVersion(version1, version2, separator))
    except getopt.error as err:
        print (str(err))
        sys.exit(2)