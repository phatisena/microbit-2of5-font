
//%block="2of5 font"
//%icon="\uf02a"
//%color="#1af09e"
//%weight=5
namespace font2of5 {

    let temppin: string[] = ["11000", "10100", "10010", "10001", "01100", "01010", "01001", "00110", "00101", "00011"]

    //%blockid=font2of5_print2of5number
    //%block="show 2of5 number $valinput ||in horizontal $horizontal"
    //%valinput.defl=84210
    //%group="show screen"
    //%weight=2
    export function show2of5number(valinput: number = 0, horizontal: boolean = false) {
        let inputstr = valinput.toString()
        let outputstr = ""
        let strval = ""
        for (let j = inputstr.length - 1; j >= 0; j--) {
            outputstr = "" + inputstr.charAt(j) + outputstr
            if (Math.abs((inputstr.length - 1) - j) > 4) { break; }
        }
        basic.clearScreen()
        for (let i = 0; i < outputstr.length; i++) {
            strval = temppin[parseInt(outputstr.charAt(i))]
            for (let j = 0; j < strval.length; j++) {
                if (parseInt(strval.charAt(j)) > 0) {
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
