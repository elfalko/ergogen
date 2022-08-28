// Via
// Nets
//		net: the net this via should be connected to

module.exports = {
    nets: {
      net: undefined
    },
    params: {
      d: 0.3,
      w: 0.2
    },
    body: p => `
      (module VIA-${p.param.d}mm (layer F.Cu) (tedit 591DBFB0)
      ${p.at /* parametric position */}   
      ${'' /* footprint reference */}
      (fp_text reference REF** (at 0 1.4) (layer F.SilkS) hide (effects (font (size 1 1) (thickness 0.15))))
      (fp_text value VIA-${p.param.d}mm (at 0 -1.4) (layer F.Fab) hide (effects (font (size 1 1) (thickness 0.15))))

      ${'' /* via */}
      (pad 1 thru_hole circle (at 0 0) (size ${p.param.d+2*p.param.w} ${p.param.d+2*p.param.w}) (drill ${p.param.d}) (layers *.Cu) (zone_connect 2) ${p.net.net.str})
      )
    `
}
