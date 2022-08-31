module.exports = {
  nets: {
    from_1: undefined,
    from_2: undefined,
    to: undefined
  },
  params: {
    class: 'J',
    reverse: false,
    side: 'F'
  },
  body: p => {
    const standard = `
      (module solderjumper (layer ${p.param.side}.Cu) (tedit 6135B927)
      ${p.at /* parametric position */}

      ${'' /* footprint description, tags and reference */}
      (descr "Solder-jumper reversible footprint")
      (tags "reversible solder jumper")
      (fp_text reference "${p.ref}" (at 0 1 ${p.rot + 90}) (layer ${p.param.side}.SilkS) ${p.ref_hide}
        (effects (font (size 1 1) (thickness 0.15)))
      )
      `
    function footprint(side,from){
      return `
      (pad 1 smd custom (at 0 -0.508 ${p.rot}) (size 0.1 0.1) (layers ${side}.Cu ${side}.Mask) ${from}
        (clearance 0.1) (zone_connect 0)
        (options (clearance outline) (anchor rect))
        (primitives
          (gr_poly (pts
            (xy 0.6 -0.4) (xy -0.6 -0.4) (xy -0.6 -0.2) (xy 0 0.4) (xy 0.6 -0.2)
    ) (width 0))
        ))
      (pad 2 smd custom (at 0 0.508 ${p.rot}) (size 1.2 0.5) (layers ${side}.Cu ${side}.Mask) ${p.net.to.str}
        (clearance 0.1) (zone_connect 0)
        (options (clearance outline) (anchor rect))
        (primitives
          (gr_poly (pts (xy 0.6 0) (xy -0.6 0) (xy -0.6 -1) (xy 0 -0.4) (xy 0.6 -1)) (width 0))
        ))
      `
    }
    if(p.param.reverse){
      return `
      ${standard}
      ${footprint('F',p.net.from_1.str)}
      ${footprint('B',p.net.from_2.str)}
      )
      `
    }else{
      return `
      ${standard}
      ${footprint(p.param.side,p.net.from_1.str)}
      )
      `
    }
  }
}


