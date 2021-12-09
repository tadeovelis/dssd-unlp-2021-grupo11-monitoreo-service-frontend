import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { useEffect, useState } from "react"
import ReactJson from "react-json-view";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function PaisesEstados(props) {

    const [topEstados, setTopEstados] = useState({});
    const [topIdiomas, setTopIdiomas] = useState({});
    const [topContinente, setTopContinente] = useState({});
    const [continentesNoSeExporta, setContinentesNoSeExporta] = useState({});
    const [paisesNoSeExporta, setPaisesNoSeExporta] = useState({});

    useEffect(() => {
        //let ruta = "api/stats/averageCaseTime";

        fetch("http://localhost:81/api/topEstados", {
            method: 'GET',
            credentials: 'include',
        })
            .then(response => response.json()
                .then(data => {
                    //console.log(response);
                    console.log("TopEstados");
                    console.log(data);
                    setTopEstados(data);
                })
                .catch(error => console.error(error)));
    }, [])

    useEffect(() => {
        //let ruta = "api/stats/averageCaseTime";

        fetch("http://localhost:81/api/topIdiomas", {
            method: 'GET',
            credentials: 'include',
        })
            .then(response => response.json()
                .then(data => {
                    //console.log(response);
                    console.log("TopIdiomas");
                    console.log(data);
                    setTopIdiomas(data);
                })
                .catch(error => console.error(error)));
    }, [])

    useEffect(() => {
        //let ruta = "api/stats/averageCaseTime";

        fetch("http://localhost:81/api/topContinente", {
            method: 'GET',
            credentials: 'include',
        })
            .then(response => response.json()
                .then(data => {
                    console.log(data);
                    setTopContinente(data);
                })
                .catch(error => console.error(error)));
    }, [])

    useEffect(() => {
        //let ruta = "api/stats/averageCaseTime";

        fetch("http://localhost:81/api/continentesNoSeExporta", {
            method: 'GET',
            credentials: 'include',
        })
            .then(response => response.json()
                .then(data => {
                    console.log(data);
                    setContinentesNoSeExporta(data);
                })
                .catch(error => console.error(error)));
    }, [])

    useEffect(() => {
        //let ruta = "api/stats/averageCaseTime";

        fetch("http://localhost:81/api/paisesNoSeExporta", {
            method: 'GET',
            credentials: 'include',
        })
            .then(response => response.json()
                .then(data => {
                    console.log(data);
                    setPaisesNoSeExporta(data);
                })
                .catch(error => console.error(error)));
    }, [])


    return (
        <>
            {topEstados &&
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Top Estados</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ReactJson src={topEstados} />
                    </AccordionDetails>
                </Accordion>
            }
            {topIdiomas &&
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Top Idiomas</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ReactJson src={topIdiomas} />
                    </AccordionDetails>
                </Accordion>
            }
            {topContinente &&
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Top Continente</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ReactJson src={topContinente} />
                    </AccordionDetails>
                </Accordion>
            }
            {continentesNoSeExporta &&
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Continentes a los que no se exporta</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ReactJson src={continentesNoSeExporta} />
                    </AccordionDetails>
                </Accordion>
            }
            {paisesNoSeExporta &&
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Países a los que no se exporta</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ReactJson src={paisesNoSeExporta} />
                    </AccordionDetails>
                </Accordion>
            }
        </>
    )
}