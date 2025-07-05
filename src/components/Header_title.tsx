import type { ReactNode } from 'react'
import './Header_title.css'

interface Header_title_props {
    children? : ReactNode
}

export default function Header_title({children}: Header_title_props) {
    return (
        <h1 className='header-title'>
            {children}
        </h1>
    )
}

