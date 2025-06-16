package com.epiclanka.bookingsysbackend.controller;

import com.epiclanka.bookingsysbackend.dto.AdDTO;
import com.epiclanka.bookingsysbackend.dto.ReservationDTO;
import com.epiclanka.bookingsysbackend.dto.RespondsDTO;
import com.epiclanka.bookingsysbackend.services.company.CompanyService;
import com.epiclanka.bookingsysbackend.util.VarList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Pageable;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/company")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @PostMapping("/ad/{userId}")
    public ResponseEntity<?> postAd(@PathVariable Long userId, @ModelAttribute AdDTO adDTO) throws IOException {
        try {
            String response = companyService.postAd(userId, adDTO);

            switch (response) {
                case "00":
                    return new ResponseEntity<>(
                            RespondsDTO.of(VarList.RSP_SUCCESS, "Ad posted successfully", response), HttpStatus.OK
                    );
                case "01":
                    return new ResponseEntity<>(
                            RespondsDTO.of(VarList.RSP_FAIL, "Ad posted failed, Please try again", response), HttpStatus.BAD_REQUEST
                    );
            }
        } catch (Exception e) {
            return new ResponseEntity<>(
                    RespondsDTO.of(VarList.RSP_ERROR, e.getMessage(), null), HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
        return new ResponseEntity<>(
                RespondsDTO.of(VarList.RSP_UNHANDLED_ERROR, "Unhandled Error", null), HttpStatus.INTERNAL_SERVER_ERROR
        );
    }

    @GetMapping("/ads/{userId}")
    public ResponseEntity<?> getAllAdsByUserId(@PathVariable Long userId) {
        try {
            List<AdDTO> adDTOList = companyService.getAllAds(userId);

            if (!adDTOList.isEmpty()) {
                return new ResponseEntity<>(
                        RespondsDTO.of(VarList.RSP_SUCCESS, null, adDTOList), HttpStatus.OK
                );
            }else{
                return new ResponseEntity<>(
                        RespondsDTO.of(VarList.RSP_NO_DATA_FOUND, "No ad posted", null), HttpStatus.NOT_FOUND
                );
            }
        } catch (Exception e) {
            return new ResponseEntity<>(
                    RespondsDTO.of(VarList.RSP_ERROR, e.getMessage(), null), HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @GetMapping("/ad/{adId}")
    public ResponseEntity<?> getAdById(@PathVariable Long adId) {
       try {
           AdDTO adDTO = companyService.getAdById(adId);

           if (adDTO != null) {
               return new ResponseEntity<>(
                       RespondsDTO.of(VarList.RSP_SUCCESS, null, adDTO), HttpStatus.OK
               );
           }else{
               return new ResponseEntity<>(
                       RespondsDTO.of(VarList.RSP_NO_DATA_FOUND, "Data not found", null), HttpStatus.NOT_FOUND
               );
           }
       } catch (Exception e) {
           return new ResponseEntity<>(
                   RespondsDTO.of(VarList.RSP_ERROR, e.getMessage(), null), HttpStatus.INTERNAL_SERVER_ERROR
           );
       }
    }

    @PutMapping("/ad/{adId}")
    public ResponseEntity<?> updateAd(@PathVariable Long adId, @ModelAttribute AdDTO adDTO) throws IOException {
        try {
            String response = companyService.updateAd(adId, adDTO);

            switch (response) {
                case "00":
                    return new ResponseEntity<>(
                            RespondsDTO.of(VarList.RSP_SUCCESS, "Ad updated Successfully.", response), HttpStatus.OK
                    );
                case "01":
                    return new ResponseEntity<>(
                            RespondsDTO.of(VarList.RSP_NO_DATA_FOUND, "Not found requested ad", response), HttpStatus.NOT_FOUND
                    );
            }
        } catch (Exception e) {
            return new ResponseEntity<>(
                    RespondsDTO.of(VarList.RSP_ERROR, e.getMessage(), null), HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
        return new ResponseEntity<>(
                RespondsDTO.of(VarList.RSP_UNHANDLED_ERROR, "Unhandled Error", null), HttpStatus.INTERNAL_SERVER_ERROR
        );

    }

    @DeleteMapping("/ad/{adId}")
    public ResponseEntity<?> deleteAd(@PathVariable Long adId) {
        try {
            String response = companyService.deleteAd(adId);

            switch (response) {
                case "00":
                    return new ResponseEntity<>(
                            RespondsDTO.of(VarList.RSP_SUCCESS, "Ad deleted Successfully.", response), HttpStatus.OK
                    );
                case "01":
                    return new ResponseEntity<>(
                            RespondsDTO.of(VarList.RSP_NO_DATA_FOUND, "Not found requested ad", response), HttpStatus.NOT_FOUND
                    );
            }
        } catch (Exception e) {
            return new ResponseEntity<>(
                    RespondsDTO.of(VarList.RSP_ERROR, e.getMessage(), null), HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
        return new ResponseEntity<>(
                RespondsDTO.of(VarList.RSP_UNHANDLED_ERROR, "Unhandled Error", null), HttpStatus.INTERNAL_SERVER_ERROR
        );
    }


    @GetMapping("/bookings/{companyId}")
    public ResponseEntity<?> getAllAdBookings(@PathVariable Long companyId, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "7") int size) {

        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<ReservationDTO> reservationsPage = companyService.getAllAdBookings(companyId, pageable);

            if (reservationsPage.hasContent()) {
                return new ResponseEntity<>(
                        RespondsDTO.of(VarList.RSP_SUCCESS, null, reservationsPage), HttpStatus.OK
                );
            } else {
                return new ResponseEntity<>(
                        RespondsDTO.of(VarList.RSP_NO_DATA_FOUND, "No bookings found", null), HttpStatus.NOT_FOUND
                );
            }
        } catch (Exception e) {
            return new ResponseEntity<>(
                    RespondsDTO.of(VarList.RSP_ERROR, e.getMessage(), null), HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }


    @GetMapping("/booking/{bookingId}/{status}")
    public ResponseEntity<?> changeBookingStatus(@PathVariable Long bookingId, @PathVariable String status) {
       try {
           String response = companyService.changeBookingStatus(bookingId, status);

           switch (response) {
               case "00":
                   return new ResponseEntity<>(
                           RespondsDTO.of(VarList.RSP_SUCCESS, "Booking status change successfully", response), HttpStatus.OK
                   );
               case "01":
                   return new ResponseEntity<>(
                           RespondsDTO.of(VarList.RSP_NO_DATA_FOUND, "Not found", null), HttpStatus.NOT_FOUND
                   );
           }
       } catch (Exception e) {
           return new ResponseEntity<>(
                   RespondsDTO.of(VarList.RSP_ERROR, "Not found", null), HttpStatus.INTERNAL_SERVER_ERROR
           );
       }
        return new ResponseEntity<>(
                RespondsDTO.of(VarList.RSP_UNHANDLED_ERROR, "Unhandled Error", null), HttpStatus.INTERNAL_SERVER_ERROR
        );
    }



}
