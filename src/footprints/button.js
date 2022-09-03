module.exports = {
    nets: {
        from: undefined,
        to: undefined
    },
    params: {
        class: 'B', // for Button
        side: 'F',
        reverse: true,
        outline: false
    },
    body: p => {
      const standard = `
        (module E73:SW_TACT_ALPS_SKQGABE010 (layer F.Cu) (tstamp 5BF2CC94)

            (descr "Low-profile SMD Tactile Switch, https://www.e-switch.com/product-catalog/tact/product-lines/tl3342-series-low-profile-smt-tact-switch")
            (tags "SPST Tactile Switch")

            ${p.at /* parametric position */}
      `
      function outline(side){
        if(p.param.outline){
          return `
              ${'' /* outline */}
              (fp_line (start 2.75 1.25) (end 1.25 2.75) (layer ${side}.SilkS) (width 0.15))
              (fp_line (start 2.75 -1.25) (end 1.25 -2.75) (layer ${side}.SilkS) (width 0.15))
              (fp_line (start 2.75 -1.25) (end 2.75 1.25) (layer ${side}.SilkS) (width 0.15))
              (fp_line (start -1.25 2.75) (end 1.25 2.75) (layer ${side}.SilkS) (width 0.15))
              (fp_line (start -1.25 -2.75) (end 1.25 -2.75) (layer ${side}.SilkS) (width 0.15))
              (fp_line (start -2.75 1.25) (end -1.25 2.75) (layer ${side}.SilkS) (width 0.15))
              (fp_line (start -2.75 -1.25) (end -1.25 -2.75) (layer ${side}.SilkS) (width 0.15))
              (fp_line (start -2.75 -1.25) (end -2.75 1.25) (layer ${side}.SilkS) (width 0.15))
          `
        }else{
          return ``
        }
      }
      function footprint(side) {
        return `
            ${'' /* footprint reference */}
            (fp_text reference "${p.ref}" (at 0 0) (layer ${side}.SilkS) ${p.ref_hide} (effects (font (size 1.27 1.27) (thickness 0.15))))
            (fp_text value "" (at 0 0) (layer ${side}.SilkS) hide (effects (font (size 1.27 1.27) (thickness 0.15))))
            ${'' /* pins */}
            (pad 1 smd rect (at -3.1 -1.85 ${p.rot}) (size 1.8 1.1) (layers ${side}.Cu ${side}.Paste ${side}.Mask) ${p.net.from.str})
            (pad 1 smd rect (at 3.1 -1.85 ${p.rot}) (size 1.8 1.1) (layers ${side}.Cu ${side}.Paste ${side}.Mask) ${p.net.from.str})
            (pad 2 smd rect (at -3.1 1.85 ${p.rot}) (size 1.8 1.1) (layers ${side}.Cu ${side}.Paste ${side}.Mask) ${p.net.to.str})
            (pad 2 smd rect (at 3.1 1.85 ${p.rot}) (size 1.8 1.1) (layers ${side}.Cu ${side}.Paste ${side}.Mask) ${p.net.to.str})

            ${'' /* connections */}
            (pad 1 smd custom (at 0 -1.85 ${p.rot}) 
            (size 0 0) (layers ${side}.Cu) ${p.net.from.str} 
            (primitives (gr_line (start -3.1 0) (end 3.1 0) (width 0.25))))
            (pad 2 smd custom (at 0 1.85 ${p.rot}) 
            (size 0 0) (layers ${side}.Cu) ${p.net.to.str} 
            (primitives (gr_line (start -3.1 0) (end 3.1 0) (width 0.25))))
        `
      }
      const vias = `
            ${''/* interconnect */}
            (pad 1 thru_hole circle (at 0 -1.85) (size 0.6 0.6) (drill 0.3) (layers *.Cu *.Mask) ${p.net.from.str})
            (pad 2 thru_hole circle (at 0  1.85) (size 0.6 0.6) (drill 0.3) (layers *.Cu *.Mask) ${p.net.to.str})
      `
      
      if(p.param.reverse) {
        return `
          ${standard}
          ${footprint('F')}
          ${outline('F')}
          ${footprint('B')}
          ${outline('B')}
          ${vias}
          )
          `
      } else {
        return `
          ${standard}
          ${footprint(p.param.side)}
          ${outline(p.param.side)}
          )
          `
      }
    }
}
