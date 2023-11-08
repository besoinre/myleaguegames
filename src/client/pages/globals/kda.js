import React from 'react'

const Kda = ({ kills, deaths, assists, kdaLabel=false }) => {
    const calculatedKda = ((kills + assists) / deaths) == "Infinity"
        ? "Perfect"
        : Math.round(((kills + assists) / deaths) * 100) / 100

    return (
        <>
            <p
                className={
                    'mb-0 fw-semibold ' +
                    (calculatedKda < 2
                        ? "text-secondary"
                        : calculatedKda < 4
                            ? "text-success"
                            : calculatedKda < 6
                                ? "text-primary"
                                : "text-danger")
                }
            >
                {calculatedKda}:1 {(kdaLabel && "KDA")}
            </p>
        </>
    )
}

export default React.memo(Kda)