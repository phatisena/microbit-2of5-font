
//%block="2of5 font"
//%icon="\uf02a"
//%color="#1af09e"
//%weight=5
namespace font2of5 {

    let temppin: string[] = ["11000", "10100", "10010", "10001", "01100", "01010", "01001", "00110", "00101", "00011"]

    export function checknum (input: string) {
        for (let i = 0; i < input.length; i++) {
            if (!("0123456789".includes(input.charAt(i)))) {
                return false
            }
        }
        return true
    }
    
    //%blockid=font2of5_write2of5input
    //%block="write 2of5 code ( $num1 and $num2 )"
    //%num1.min=0 num1.max=4 num1.defl=1
    //%num2.min=0 num2.max=4 num2.defl=3
    //%group="write code"
    //%weight=1
    export function write2of5(num1: number, num2: number) {
        if (num1 == num2) { return -1 }
        if ((num1 < 0 || num1 > 4) || (num2 < 0 || num2 > 4)) { return -1 }
        let strval = ""
        let numval = 0
        for (let i = 0; i < 5; i++) {
            if ((num1 == i) || (num2 == i)) {
                strval = "" + strval + "1"
            } else {
                strval = "" + strval + "0"
            }
        }
        numval = temppin.indexOf(strval)
        return numval
    }

    //%blockid=font2of5_print2of5number
    //%block="show 2of5 number $valinput with guard $pin|| in horizontal mode $horizontal"
    //%valinput.defl=84210
    //%group="show screen"
    //%weight=2
    export function show2of5number(valinput: number = 0,pin: boolean = false, horizontal: boolean = false) {
        show2of5string(valinput.toString(), pin, horizontal)
    }

    //%blockid=font2of5_print2of5numberasstring
    //%block="show 2of5 number $valinput as string with guard $pin|| in horizontal mode $horizontal"
    //%valinput.defl="84210"
    //%group="show screen"
    //%weight=1
    export function show2of5string(valinput: string = "", pin: boolean = false, horizontal: boolean = false) {
        if (!(checknum(valinput))) { return; }
        let pinnum: number = null
        if (pin) pinnum = parseInt(valinput.charAt(valinput.length - 1));
        let inputstr = valinput
        let outputstr = ""
        let strval = ""
        let gapval = 0
        if (pin) gapval += 1;
        for (let j = (inputstr.length - 1) - gapval; j >= 0; j--) {
            outputstr = "" + inputstr.charAt(j) + outputstr
            if (Math.abs((inputstr.length - 1) - j) > 4) { break; }
        }
        if (outputstr.length < 5) {
            while (outputstr.length < 5) {
                outputstr = "" + "0" + outputstr
            }
        }
        let guardpin = temppin[pinnum]
        for (let i = 0; i < outputstr.length; i++) {
            strval = temppin[parseInt(outputstr.charAt(i))]
            for (let j = 0; j < strval.length; j++) {
                if (pin) {
                    if (parseInt(guardpin.charAt(j)) <= 0) {
                        if (parseInt(strval.charAt(j)) > 0) {
                    if (horizontal) {
                        led.plot(j, i)
                    } else {
                        led.plot(i, j)
                    }
                } else if (parseInt(strval.charAt(j)) <= 0) {
                            if (horizontal) {
                        led.unplot(j, i)
                    } else {
                        led.unplot(i, j)
                            }
                        }
                    } else if (parseInt(guardpin.charAt(j)) > 0) {
                        if (parseInt(strval.charAt(j)) > 0) {
                    if (horizontal) {
                        led.unplot(j, i)
                    } else {
                        led.unplot(i, j)
                    }
                } else if (parseInt(strval.charAt(j)) <= 0) {
                    if (horizontal) {
                        led.plot(j, i)
                    } else {
                        led.plot(i, j)
                    }
                }
                    }
                } else {
                if (parseInt(strval.charAt(j)) <= 0) {
                    if (horizontal) {
                        led.unplot(j, i)
                    } else {
                        led.unplot(i, j)
                    }
                } else if (parseInt(strval.charAt(j)) > 0) {
                    if (horizontal) {
                        led.plot(j, i)
                    } else {
                        led.plot(i, j)
                    }
                }
                }
            }
        }
    }

}
