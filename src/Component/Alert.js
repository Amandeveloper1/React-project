import React from 'react'

export default function Alert(props) {
    return (
        <>
        <div >
            {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show mb-0`} role="alert">
                {props.alert.msg}
            </div>}
        </div>
    </>
    )
}
