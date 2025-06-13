package com.epiclanka.bookingsysbackend.controller;

import com.epiclanka.bookingsysbackend.dto.*;
import com.epiclanka.bookingsysbackend.entity.Reservation;
import com.epiclanka.bookingsysbackend.services.client.ClientService;
import com.epiclanka.bookingsysbackend.util.VarList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/client/")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @Autowired
    private RespondsDTO respondsDTO;


    @GetMapping("/ads")
    public ResponseEntity<?> getAllAds() {
        try {
            List<AdDTO> adDTOList = clientService.getAllAds();

            if(!adDTOList.isEmpty()){
                return new ResponseEntity<>(
                        RespondsDTO.of(VarList.RSP_SUCCESS, null, adDTOList), HttpStatus.OK
                );
            }else{
                return new ResponseEntity<>(
                        RespondsDTO.of(VarList.RSP_NO_DATA_FOUND, "You have no ads today.", null), HttpStatus.NOT_FOUND
                );
            }
        } catch (Exception e) {
            return new ResponseEntity<>(
                    RespondsDTO.of(VarList.RSP_ERROR, e.getMessage(), null), HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @GetMapping("/search/{name}")
    public ResponseEntity<?> searchAdByService(@PathVariable String name) {

        try {
            List<AdDTO> adDTOList = clientService.searchAdByName(name);

            if(!adDTOList.isEmpty()){
                return new ResponseEntity<>(
                        RespondsDTO.of(VarList.RSP_SUCCESS, null, adDTOList), HttpStatus.OK
                );
            }else{
                return new ResponseEntity<>(
                        RespondsDTO.of(VarList.RSP_NO_DATA_FOUND, "Not found any ads", null), HttpStatus.NOT_FOUND
                );
            }
        } catch (Exception e) {
            return new ResponseEntity<>(
                    RespondsDTO.of(VarList.RSP_ERROR, e.getMessage(), null), HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @PostMapping("/book-service")
    public ResponseEntity<?> bookService(@RequestBody ReservationDTO reservationDTO) {

        try {
            String response = clientService.bookService(reservationDTO);

            switch (response) {
                case "00":
                    return new ResponseEntity<>(
                            RespondsDTO.of(VarList.RSP_SUCCESS, "Your booking was successfull", response), HttpStatus.OK
                    );
                case "01":
                    return new ResponseEntity<>(
                            RespondsDTO.of(VarList.RSP_NO_DATA_FOUND, "Something is missing", null), HttpStatus.BAD_REQUEST
                    );
                case "10":
                    return new ResponseEntity<>(
                            RespondsDTO.of(VarList.RSP_FAIL, "Something went wrong", null), HttpStatus.BAD_REQUEST
                    );
            }
        } catch (Exception e) {
            return new ResponseEntity<>(
                    RespondsDTO.of(VarList.RSP_ERROR, e.getMessage(), null), HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
        return new ResponseEntity<>(
                RespondsDTO.of(VarList.RSP_ERROR, "Unhandled Error", null), HttpStatus.INTERNAL_SERVER_ERROR
        );

    }

    @GetMapping("/ad/{adId}")
    public ResponseEntity<?> getAdDetailsByAdId(@PathVariable Long adId) {

        try {
            AdDetailsForClientDTO adDetailsForClientDTO = clientService.getAdDetailsByAdId(adId);

            if(adDetailsForClientDTO != null){
                return new ResponseEntity<>(
                        RespondsDTO.of(VarList.RSP_SUCCESS, "successful", adDetailsForClientDTO), HttpStatus.OK
                );
            }else{
                return new ResponseEntity<>(
                        RespondsDTO.of(VarList.RSP_NO_DATA_FOUND, "Not found data", null), HttpStatus.NOT_FOUND
                );
            }
        } catch (Exception e) {
            return new ResponseEntity<>(
                    RespondsDTO.of(VarList.RSP_ERROR, e.getMessage(), null), HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @DeleteMapping("/delete-booking/{id}")
    public ResponseEntity<?> deleteBooking(@PathVariable Long id) {

        try {
            String response = clientService.deleteBooking(id);

            switch (response) {
                case "00":
                    return new ResponseEntity<>(
                            RespondsDTO.of(VarList.RSP_SUCCESS, "Booking deleted successfully", response), HttpStatus.OK
                    );
                case "01":
                    return new ResponseEntity<>(
                            RespondsDTO.of(VarList.RSP_NO_DATA_FOUND, "Not Found", response), HttpStatus.NOT_FOUND
                    );
                case "10":
                    return new ResponseEntity<>(
                            RespondsDTO.of(VarList.RSP_FAIL, "Something went wrong", response), HttpStatus.BAD_REQUEST
                    );
            }
        } catch (Exception e) {
            return new ResponseEntity<>(
                    RespondsDTO.of(VarList.RSP_ERROR, e.getMessage(), null), HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
        return new ResponseEntity<>(
                RespondsDTO.of(VarList.RSP_ERROR, "Unhandled Error", null), HttpStatus.INTERNAL_SERVER_ERROR
        );
    }

    @GetMapping("/my-bookings/{userId}")
    public ResponseEntity<?> getAllBookingsByUserId(@PathVariable Long userId) {

        try {
            List<ReservationDTO> reservationDTOList = clientService.getAllBookingsByUserId(userId);

            if (!reservationDTOList.isEmpty()) {
                return new ResponseEntity<>(
                        RespondsDTO.of(VarList.RSP_SUCCESS, null, reservationDTOList), HttpStatus.OK
                );
            } else {
                return new ResponseEntity<>(
                        RespondsDTO.of(VarList.RSP_NO_DATA_FOUND, "No Bookings Yet", null), HttpStatus.NOT_FOUND
                );
            }
        } catch (Exception e) {
            return new ResponseEntity<>(
                    RespondsDTO.of(VarList.RSP_ERROR, e.getMessage(), null), HttpStatus.INTERNAL_SERVER_ERROR
            );
        }

    }

    @PostMapping("/review")
    public ResponseEntity<?> giveReview(@RequestBody ReviewDTO reviewDTO) {
        try {
            String response = clientService.giveReview(reviewDTO);

            switch (response) {
                case "00":
                    return new ResponseEntity<>(
                            RespondsDTO.of(VarList.RSP_SUCCESS, "Review Successfully Added.", response), HttpStatus.OK
                    );
                case "07":
                    return new ResponseEntity<>(
                            RespondsDTO.of(VarList.RSP_SOMETHING_IS_MISSING, "Required data is missing", null), HttpStatus.BAD_REQUEST
                    );
                case "10":
                    return new ResponseEntity<>(
                            RespondsDTO.of(VarList.RSP_FAIL, "Something went wrong", null), HttpStatus.BAD_REQUEST
                    );
                default:
                    return new ResponseEntity<>(
                            RespondsDTO.of(VarList.RSP_UNHANDLED_ERROR, "Unknown response code", response), HttpStatus.BAD_REQUEST
                    );
            }

        } catch (Exception e) {
            return new ResponseEntity<>(
                    RespondsDTO.of(VarList.RSP_ERROR, e.getMessage(), null), HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }


}