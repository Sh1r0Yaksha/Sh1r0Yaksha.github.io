import { type ReactNode } from 'react';
import './Header_text.css'

interface Header_text_props {
    children? : ReactNode
}

export default function Header_text({children} : Header_text_props) {
    return (
        <>
            <div className='header-text'>
                {children}
            </div>
        </>
    )
}