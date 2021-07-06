import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { fetchRingTimesData } from '../api/controllino';

interface RingTimes {
    id: number | null;
    time: string;
    duration: number;
}

const Index: React.FC<RingTimes> = ({}): JSX.Element => {
    const [ringTimes, setRingTimes] = useState<RingTimes[]>([
        { id: 1, time: '04:00', duration: 1 },
        { id: 2, time: '08:00', duration: 12 },
        { id: 3, time: '12:00', duration: 5 },
        { id: 4, time: '06:00', duration: 1 },
        { id: 5, time: '08:00', duration: 66 },
        { id: 6, time: '04:00', duration: 21 },
        { id: 7, time: '03:00', duration: 4 },
    ]);

    const [activeRingTime, setActiveRingTime] = useState<RingTimes>(null);
    const [error, setError] = useState<string | null>(null);

    // alarm types
    const [emergencyAlarm, setEmergencyAlarm] = useState<boolean>(false);
    const [fireAlarm, setFireAlarm] = useState<boolean>(true);
    const [bell, setBell] = useState<boolean>(false);

    const handleRingTimeSubmit = async () => {
        const result = await fetch('api/submit-controller-data', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                activeRingTime,
                emergencyAlarm,
                fireAlarm,
                bell,
            }),
        });

        if (result.ok) {
            setRingTimes(result.json());
        } else {
            setError('etwas ist schief gelaufen');
        }

        setTimeout(() => setError(null), 2000);
    };

    const handleRingTimeDelete = async (id: number) => {
        const result = await fetch('/delete-ring-time', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(id),
        });

        if (result.ok) {
            setRingTimes(ringTimes.filter((ringTime) => ringTime.id !== id));
        } else {
            setError('beim löschen ist ein fehler unterlaufen.');
        }
    };

    const addRingTime = () => setRingTimes([...ringTimes, { id: Math.random(), duration: 0, time: '' }]);

    return (
        <div className="main-wrapper">
            {error && <h1 className="error">{error}</h1>}
            <div className="edit-wrapper">
                <div className="ring-times-box">
                    <h2>Läutezeiten</h2>
                    {ringTimes.map((timeField, idx) => (
                        <div className="time-field-wrapper">
                            <div
                                className={`time-field ${activeRingTime?.id === timeField?.id ? 'active' : ''}`}
                                key={idx}
                                onClick={() => setActiveRingTime(timeField)}>
                                <span>{timeField.time}</span>
                            </div>
                            <button onClick={() => handleRingTimeDelete(timeField.id)}>X</button>
                        </div>
                    ))}
                </div>
                <button className="add-ring-time" onClick={() => addRingTime()}>
                    Zeit hinzufügen
                </button>
            </div>
            <div className="edit-wrapper">
                {activeRingTime && (
                    <div className="ring-times-edit-box">
                        <div className="ring-times-input-fields">
                            <div className="ring-time-form-group">
                                <label htmlFor="ring-time">Uhrzeit editieren:</label>
                                <input
                                    name="ring-time"
                                    type="text"
                                    value={activeRingTime.time}
                                    onChange={(e) => setActiveRingTime({ ...activeRingTime, time: e.currentTarget.value })}
                                />
                            </div>
                            <div className="ring-time-form-group">
                                <label htmlFor="ring-time">Läutdauer (sek.)</label>
                                <input
                                    name="ring-length"
                                    type="number"
                                    value={activeRingTime.duration}
                                    onChange={(e) => setActiveRingTime({ ...activeRingTime, duration: parseInt(e.currentTarget.value, 10) })}
                                />
                            </div>
                        </div>
                        <div className="ring-times-input-controls">
                            <button className="submit-ring-time" onClick={() => handleRingTimeSubmit()}>
                                Änderungen übernehmen
                            </button>
                        </div>
                    </div>
                )}
                <div className={`alarm-box ${activeRingTime ? 'ring-time-active' : ''}`}>
                    <div className="ring-time-form-group checkbox">
                        <label htmlFor="emergency-alarm">Notfallalarm</label>
                        <input id="emergency-alarm" type="checkbox" checked={emergencyAlarm} onChange={() => setEmergencyAlarm(!emergencyAlarm)} />
                    </div>
                    <div className="ring-time-form-group checkbox">
                        <label htmlFor="fire-alarm">Brandalarm setzen</label>
                        <input id="fire-alarm" type="checkbox" checked={fireAlarm} onChange={() => setFireAlarm(!fireAlarm)} />
                    </div>
                    <div className="ring-time-form-group checkbox">
                        <label htmlFor="bell">Glocke an</label>
                        <input id="bell" type="checkbox" checked={bell} onChange={() => setBell(!bell)} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async ({}) => {
    const data = (await fetchRingTimesData()) || null;
    return {
        props: {
            data,
        },
    };
};

export default Index;
