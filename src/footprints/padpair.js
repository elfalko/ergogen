module.exports = {
    nets: {
        A: undefined,
        B: undefined
    },
  //https://eepower.com/resistor-guide/resistor-standards-and-codes/resistor-sizes-and-packages/
  // 0805 d:1 h:1.25 w:0.7 
    params: {
        class: 'PAD',
        width: 1,
        height: 1.3,
        distance: 1.2,
        side: 'F',
        reverse: true,
        text: '',
    },
    body: p => {

        const standard = `
            (module SMDPad (layer F.Cu) (tedit 5B24D78E)
            ${p.at /* parametric position */}
        `
        function footprint(side) {
          return `
            ${'' /* footprint reference */}
            (pad 1 smd rect (at ${(p.param.distance+p.param.width)/2} 0 ${p.rot}) (size ${p.param.width} ${p.param.height}) (layers ${side}.Cu ${side}.Paste ${side}.Mask) ${p.net.A.str} (zone_connect 0))
            (pad 2 smd rect (at ${-(p.param.distance+p.param.width)/2} 0 ${p.rot}) (size ${p.param.width} ${p.param.height}) (layers ${side}.Cu ${side}.Paste ${side}.Mask) ${p.net.B.str} (zone_connect 0))
            (fp_text user ${p.param.text} (at 0 ${p.param.height} ${p.rot}) (layer ${side}.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))))
          `
        }

        const vias = `
          ${''/* THT terminals */}
          (pad 1 thru_hole circle (at ${(p.param.distance+p.param.width)} 0 ${p.rot}) (size 0.6 0.6) (drill 0.2) (layers *.Cu *.Mask) (zone_connect 0))
          (pad 2 thru_hole circle (at ${-(p.param.distance+p.param.width)} 0 ${p.rot}) (size 0.6 0.6) (drill 0.2) (layers *.Cu *.Mask) (zone_connect 0))

          ${''/* connect THT and pads */}
          (pad "" smd custom (at ${p.param.distance+p.param.width} 0 ${p.rot}) (size 0 0) (layers F.Cu) ${p.net.A.str} (zone_connect 0)
            (primitives (gr_line (start 0 0) (end -${p.param.width} 0) (width 0.25))))
          (pad "" smd custom (at ${-(p.param.distance+p.param.width)} 0 ${p.rot}) (size 0 0) (layers F.Cu) ${p.net.B.str} (zone_connect 0)
            (primitives (gr_line (start 0 0) (end ${p.param.width} 0) (width 0.25))))
          (pad "" smd custom (at ${p.param.distance+p.param.width} 0 ${p.rot}) (size 0 0) (layers B.Cu) ${p.net.A.str} (zone_connect 0)
            (primitives (gr_line (start 0 0) (end -${p.param.width} 0) (width 0.25))))
          (pad "" smd custom (at ${-(p.param.distance+p.param.width)} 0 ${p.rot}) (size 0 0) (layers B.Cu) ${p.net.B.str} (zone_connect 0)
            (primitives (gr_line (start 0 0) (end ${p.param.width} 0) (width 0.25))))
        `
        if(p.param.reverse){
          return `
              ${standard}
              ${footprint('F')}
              ${footprint('B')}
              ${vias})
              `
        }else{
          return `
              ${standard}
              ${footprint(p.param.side)}
              ${vias})
              `
        }
    }
}
