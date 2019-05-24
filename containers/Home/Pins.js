import React from 'react';
import Pin from '../../components/Pin';
import {Marker} from 'react-native-maps';
import { withRouter } from "react-router";

import {ENUM_STATUS, convertStatus} from '../../enums/status';
import Sounds from '../../components/Sounds';

const ClassicMarker = ({incidence:{id, latitude, longitude, status}, history}) => (
    <Sounds>
        {sounds => (
            <Marker
                coordinate={{
                    latitude,
                    longitude,
                }}
                onPress={() => {sounds.button(); history.push(`/status/${id}`)}}
            >
                {/* verify that we have a status, normally it's mandatory... but a double check doesn't hurt */}
                {status.length !== 0 ? <Pin status={convertStatus(status[status.length - 1].status)}/> : <Pin status={ENUM_STATUS.REPORTED}/>}
            </Marker>
        )}
    </Sounds>
)

const ClassicMarkerWithRouter = withRouter(ClassicMarker);

const Pins = ({mappedIncidences}) => {
    let groups = [];
    let solos = [];
    mappedIncidences.map(mappedIncidence => {
        if(mappedIncidence.count === 1){
            solos = [...solos, ...mappedIncidence.incidences]
        }else{
            groups= [...groups, ...mappedIncidence]
        }
    })
    return(
        <>
            {solos.map(incidence => <ClassicMarkerWithRouter key={incidence.id} incidence={incidence}/>)}
        </>
    )
}

export default Pins;