import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js'; // Importar registerables
import { db } from '../../firebase.js'; // Ajusta la ruta aquí
import { collection, getDocs } from 'firebase/firestore';
import { BsFillBarChartLineFill, BsQuestionCircleFill, BsPeopleFill, BsClipboardData } from 'react-icons/bs';

// Registrar las escalas y otros elementos de Chart.js
Chart.register(...registerables);

function Home() {
    const barChartRef = useRef(null);
    const lineChartRef = useRef(null);
    const [dataCounts, setDataCounts] = useState({ surveys: 0, questions: 0, users: 0, reports: 0 });

    useEffect(() => {
        const fetchData = async () => {
            const surveysCollection = collection(db, 'encuestas');
            const questionsCollection = collection(db, 'preguntas');
            const usersCollection = collection(db, 'usuarios');
            const reportsCollection = collection(db, 'reportes');

            const surveysSnapshot = await getDocs(surveysCollection);
            const questionsSnapshot = await getDocs(questionsCollection);
            const usersSnapshot = await getDocs(usersCollection);
            const reportsSnapshot = await getDocs(reportsCollection);

            setDataCounts({
                surveys: surveysSnapshot.size,
                questions: questionsSnapshot.size,
                users: usersSnapshot.size,
                reports: reportsSnapshot.size
            });
        };

        fetchData();
    }, []);

    useEffect(() => {
        const barData = {
            labels: ['Encuesta A', 'Encuesta B', 'Encuesta C', 'Encuesta D', 'Encuesta E'],
            datasets: [
                {
                    label: 'Respuestas',
                    data: [4000, 3000, 2000, 2780, 1890],
                    backgroundColor: '#333',
                    borderColor: '#37b052',
                },
                {
                    label: 'Participantes',
                    data: [2400, 1398, 9800, 3908, 4800],
                    backgroundColor: '#37b052',
                    borderColor: '#37b052',
                },
            ],
        };

        const barOptions = {
            plugins: {
                title: {
                    display: true,
                    text: 'Respuestas por Encuesta',
                    font: {
                        size: 18
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true,
                },
            },
        };

        const barChart = new Chart(barChartRef.current, {
            type: 'bar',
            data: barData,
            options: barOptions,
        });

        const lineData = {
            labels: ['Encuesta A', 'Encuesta B', 'Encuesta C', 'Encuesta D', 'Encuesta E'],
            datasets: [
                {
                    label: 'Participantes',
                    data: [4000, 3000, 2000, 2780, 1890],
                    borderColor: '#37b052',
                    fill: false,
                },
                {
                    label: 'Respuestas',
                    data: [2400, 1398, 9800, 3908, 4800],
                    borderColor: '#333',
                    fill: false,
                },
            ],
        };

        const lineOptions = {
            plugins: {
                title: {
                    display: true,
                    text: 'Participantes a lo largo del tiempo',
                    font: {
                        size: 18
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                },
                y: {
                    beginAtZero: true,
                },
            },
        };

        const lineChart = new Chart(lineChartRef.current, {
            type: 'line',
            data: lineData,
            options: lineOptions,
        });

        return () => {
            barChart.destroy();
            lineChart.destroy();
        };
    }, []);

    return (
        <main className='main-container'>
            <div className='main-title'>
                <h3>PANEL DE ENCUESTAS</h3>
            </div>
            <div className='main-cards'>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>ENCUESTAS</h3>
                        <BsFillBarChartLineFill className='card_icon' />
                    </div>
                    <h3>{dataCounts.surveys}</h3>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>PREGUNTAS</h3>
                        <BsQuestionCircleFill className='card_icon' />
                    </div>
                    <h3>{dataCounts.questions}</h3>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>USUARIOS</h3>
                        <BsPeopleFill className='card_icon' />
                    </div>
                    <h3>{dataCounts.users}</h3>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>REPORTES</h3>
                        <BsClipboardData className='card_icon' />
                    </div>
                    <h3>{dataCounts.reports}</h3>
                </div>
            </div>
            <div className='charts'>
                <div className='chart-container'>
                    <canvas ref={barChartRef} />
                </div>
                <div className='chart-container'>
                    <canvas ref={lineChartRef} />
                </div>
            </div>
        </main>
    );
}

export default Home;
