
//%block="2of5 font"
//%icon="\uf02a"
//%color="#0749a6"
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
    
    /**
     * write to number in 2of5 code
     * @param to write 1st 2of5 code
     * @param to write 2nd 2of5 code
     * but two param are not existing by two value
     */
    //%blockid=font2of5_write2of5input
    //%block="write 2of5 code ( $num1 and $num2 )"
    //%num1.min=0 num1.max=4 num1.defl=1
    //%num2.min=0 num2.max=4 num2.defl=3
    //%group="write code"
    //%weight=1
    export function write2of5(num1: number, num2: number) {
        if (num1 == num2) return -1;
        num1 = Math.min(num1,4)
        num1 = Math.max(num1,0)
        num2 = Math.min(num2,4)
        num2 = Math.max(num2,0)
        if (num1 == num2) return -1;
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

    /**
     * write number to show number in 2of5 code to the screen
     * like 1d barcode
     * @param are the number input to render
     * @param is the guard with place one 2of5 to main 2of5 like invert 2of5 code if true
     * @param as boolean to render in horizontal mode if true
     */
    //%blockid=font2of5_print2of5number
    //%block="show 2of5 number $valinput with guard $pin|| in horizontal mode $horizontal"
    //%valinput.defl=84210
    //%group="show screen"
    //%weight=8
    export function show2of5number(valinput: number = 0,pin: boolean = false, horizontal: boolean = false) {
        show2of5string(valinput.toString(), pin, horizontal)
    }

    /**
     * write string as number to show number in 2of5 code to the screen
     * like 1d barcode
     * @param are the string input to render (but only number charcter no special charcter)
     * @param is the guard with place one 2of5 to main 2of5 like invert 2of5 code if true
     * @param as boolean to render in horizontal mode if true
     */
    //%blockid=font2of5_print2of5numberasstring
    //%block="show 2of5 number $valinput as string with guard $pin|| in horizontal mode $horizontal"
    //%valinput.defl="84210"
    //%group="show screen"
    //%weight=6
    export function show2of5string(valinput: string = "", pin: boolean = false, horizontal: boolean = false) {
        if (!(checknum(valinput))) return;
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
                    if (parseInt(guardpin.charAt(i)) <= 0) {
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
                    } else if (parseInt(guardpin.charAt(i)) > 0) {
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
    
    /**
     * show number in one digit to render to the screen
     * @param is number to render in one digit
     * @param to get 2of5 invert if true
     * @param to place in position from horizontal if true this pos are placing in x else this pos are placing in y
     * @param to get place in harizontal mode if true
     */
    //%blockid=font2of5_showin1digit
    //%block="show 2of5 in one number $num and get invert? $invert place at $column|| in horizontal? $horizontal"
    //%num.min=0 num.max=9 num.defl=8
    //%column.min=0 column.max=4 column.defl=2
    //%group="show screen"
    //%weight=4
    export function show2of5in1d(num: number = 0, invert: boolean = false, column: number = 0, horizontal: boolean = false) {
        let numval = num % 10
        column = Math.min(column, 4)
        column = Math.max(column, 0)
        let pinstr = temppin[numval]
        let curnum = 0
        for (let _i = 0; _i < pinstr.length; _i++) {
            curnum = parseInt(pinstr.charAt(_i))
            if (invert) {
                if (curnum > 0) {
                    if (horizontal) {
                        led.unplot(_i,column)
                    } else {
                        led.unplot(column,_i)
                    }
                } else if (curnum <= 0) {
                    if (horizontal) {
                        led.plot(_i,column)
                    } else {
                        led.plot(column,_i)
                    }
                }
            } else {
                if (curnum > 0) {
                    if (horizontal) {
                        led.plot(_i,column)
                    } else {
                        led.plot(column,_i)
                    }
                } else if (curnum <= 0) {
                    if (horizontal) {
                        led.unplot(_i,column)
                    } else {
                        led.unplot(column,_i)
                    }
                }
            }
        }
    }
    
    export enum showalign {left = 1, center = 2, right = 3}

    /**
     * render two number values in 2of5 code to the screen
     * @param is the 1st number value
     * @param is the 2nd number value
     * @param to render in horizontal mode if true
     */
    //%blockid=font2of5_showtwonumbervalues
    //%block="show ( $num1 and $num2 ) as two number values with alignment $align|| in horizontal $horizontal"
    //%num1.min=0 num1.max=99 num1.defl=26
    //%num2.min=0 num2.max=99 num2.defl=48
    //%group="show screen"
    //%weight=2
    export function showduonum(num1: number = 0, num2: number = 0, align:showalign, horizontal: boolean = false ) {
        let numl1: number[] = [Math.floor(num1 / 10) % 10, num1 % 10]
        let numl2: number[] = [Math.floor(num2 / 10) % 10, num2 % 10]
        switch (align) {
            case 1 :
            numl1.unshift(Math.floor(num1 / 100) % 10)
            numl2.removeAt(0)
            break;
            case 2 :
            break;
            case 3 :
            numl2.unshift(Math.floor(num2 / 100) % 10)
            numl1.removeAt(0)
            default:
            return;
        }
        switch (align) {
            case 1 :
            show2of5in1d(numl1[0],false,0,horizontal)
            show2of5in1d(numl1[1],false,1,horizontal)
            show2of5in1d(numl1[2],false,2,horizontal)
            show2of5in1d(numl2[0],false,4,horizontal)
            break;
            case 2 :
            show2of5in1d(numl1[0],false,0,horizontal)
            show2of5in1d(numl1[1],false,1,horizontal)
            show2of5in1d(numl2[0],false,3,horizontal)
            show2of5in1d(numl2[1],false,4,horizontal)
            break;
            case 3 :
            show2of5in1d(numl1[0],false,0,horizontal)
            show2of5in1d(numl2[0],false,2,horizontal)
            show2of5in1d(numl2[1],false,3,horizontal)
            show2of5in1d(numl2[2],false,4,horizontal)
            break;
            default:
            return;
        }
    }
}
