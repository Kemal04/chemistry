import React from 'react'

const Footer = () => {

    const nowYear = new Date().getFullYear()

    return (
        <>
            <footer className="footer mt-auto py-3 bg-light text-center">
                <div className="container">
                    <span className="text-muted">© {nowYear} TT we II. Ähli hukuklar goraglydyr.</span>
                </div>
            </footer>
        </>
    )
}

export default Footer