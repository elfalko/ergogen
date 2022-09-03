module.exports = {
    params: {
        class: 'RAW',
        side: "F",
        text: undefined,
        reverse: true
    },
    body: p => {
      function footprint(side){
        const mirror = side == 'B' ? '(justify mirror)' : ''
        return `
        (footprint "Text" (layer "${side}.Cu")

        ${p.at /* parametric position */}
        (attr board_only exclude_from_pos_files exclude_from_bom)
        (fp_text value "${p.param.text}" (at 0 0 ${p.rot}) (layer ${side}.SilkS) (effects (font (thickness 0.3)) ${mirror}))
        )
        `
      }
      if(p.param.reverse){
        return `
          ${footprint('F')}
          ${footprint('B')}
        `
      }else{
        return `
          ${footprint(p.param.side)}
        `
      }
    }
}
