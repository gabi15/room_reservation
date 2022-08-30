import ListGroup from 'react-bootstrap/ListGroup'
import { getDateFromString, getTimeFromString } from '../../DateHelper'


const CustomList = ({ reservations }) => {
    return <ListGroup as="ul">
        {reservations
            .map((slot, index) => {
                let startDate = new Date(slot.startDate);
                let endDate = new Date(slot.endDate);
                let startString = getDateFromString(startDate) + ' ' + getTimeFromString(startDate) + ' - ' + getTimeFromString(endDate)
                return (
                    <ListGroup.Item key={`${slot.startDate}_${slot.endDate}_${slot.room.name}`} action variant="primary">
                        <b>{slot.room.name}</b> <br></br> {startString}
                        {/* <Button as="input"
                    id={`button_${index}`}
                    type="button"
                    value="Zrezygnuj"
                    className="reservation_button"
                    onClick={async (e) => {
                        const isReserved = await submitReservation(e, slot, index);
                        isReserved ? alert("zrezygnowano z rezerwacji") : alert("ups, coś poszło nie tak");

                        //setSlotData(prev => prev.map((slot2, index2) => index2 === index ? { ...slot2, reserved: isReserved } : slot2));

                    }}
                /> */}
                    </ListGroup.Item >
                )
            })}
    </ListGroup>
} 

export default CustomList;