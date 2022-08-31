module.exports = {
    nets: {
        from: undefined,
        to: undefined
    },
    params: {
        class: 'B', // for Button
        side: 'F',
        reverse: true
    },
    body: p => {
      const standard = `
        (module E73:SW_TACT_ALPS_SKQGABE010 (layer F.Cu) (tstamp 5BF2CC94)

            (descr "Low-profile SMD Tactile Switch, https://www.e-switch.com/product-catalog/tact/product-lines/tl3342-series-low-profile-smt-tact-switch")
            (tags "SPST Tactile Switch")

            ${p.at /* parametric position */}
      `
      function footprint(side) {
        return `
            ${'' /* footprint reference */}
            (fp_text reference "${p.ref}" (at 0 0) (layer ${side}.SilkS) ${p.ref_hide} (effects (font (size 1.27 1.27) (thickness 0.15))))
            (fp_text value "" (at 0 0) (layer ${side}.SilkS) hide (effects (font (size 1.27 1.27) (thickness 0.15))))
            
            ${'' /* outline */}
            (fp_line (start 2.75 1.25) (end 1.25 2.75) (layer ${side}.SilkS) (width 0.15))
            (fp_line (start 2.75 -1.25) (end 1.25 -2.75) (layer ${side}.SilkS) (width 0.15))
            (fp_line (start 2.75 -1.25) (end 2.75 1.25) (layer ${side}.SilkS) (width 0.15))
            (fp_line (start -1.25 2.75) (end 1.25 2.75) (layer ${side}.SilkS) (width 0.15))
            (fp_line (start -1.25 -2.75) (end 1.25 -2.75) (layer ${side}.SilkS) (width 0.15))
            (fp_line (start -2.75 1.25) (end -1.25 2.75) (layer ${side}.SilkS) (width 0.15))
            (fp_line (start -2.75 -1.25) (end -1.25 -2.75) (layer ${side}.SilkS) (width 0.15))
            (fp_line (start -2.75 -1.25) (end -2.75 1.25) (layer ${side}.SilkS) (width 0.15))
            
            ${'' /* pins */}
            (pad 1 smd rect (at -3.1 -1.85 ${p.rot}) (size 1.8 1.1) (layers ${side}.Cu ${side}.Paste ${side}.Mask))
            (pad 1 smd rect (at 3.1 -1.85 ${p.rot}) (size 1.8 1.1) (layers ${side}.Cu ${side}.Paste ${side}.Mask) ${p.net.from.str})
            (pad 2 smd rect (at -3.1 1.85 ${p.rot}) (size 1.8 1.1) (layers ${side}.Cu ${side}.Paste ${side}.Mask) ${p.net.to.str})
            (pad 2 smd rect (at 3.1 1.85 ${p.rot}) (size 1.8 1.1) (layers ${side}.Cu ${side}.Paste ${side}.Mask))

            ${'' /* connections */}
            (fp_line (start -3.1 -1.85) (end 3.1 -1.85) (layer ${side}.Cu) (width 0.25))
            (fp_line (start -3.1 1.85) (end 3.1 1.85) (layer ${side}.Cu) (width 0.25))
        `
      }
      const vias = `
            ${''/* interconnect */}
            (pad 1 thru_hole circle (at 0 -1.85) (size 0.6 0.6) (drill 0.2) (layers *.Cu *.Mask))
            (pad 2 thru_hole circle (at 0  1.85) (size 0.6 0.6) (drill 0.2) (layers *.Cu *.Mask))
      `
      
      if(p.param.reverse) {
        return `
          ${standard}
          ${footprint('F')}
          ${footprint('B')}
          ${vias}
          )
          `
      } else {
        return `
          ${standard}
          ${footprint(p.param.side)}
          )
          `
      }
    }
}
