import React from 'react'
import TextGreen from 'components/Text/TextGreen'
import TextPrimary from 'components/Text/TextPrimary'

const StockColorText = ({base = 0, children}) => {
    return base > 0 ? <TextPrimary>{children}</TextPrimary> : base < 0 ? <TextGreen>{children}</TextGreen> : children
}

export default StockColorText