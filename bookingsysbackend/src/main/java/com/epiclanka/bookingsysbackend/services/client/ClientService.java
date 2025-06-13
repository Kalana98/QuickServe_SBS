package com.epiclanka.bookingsysbackend.services.client;

import com.epiclanka.bookingsysbackend.dto.AdDTO;
import com.epiclanka.bookingsysbackend.dto.AdDetailsForClientDTO;
import com.epiclanka.bookingsysbackend.dto.ReservationDTO;
import com.epiclanka.bookingsysbackend.dto.ReviewDTO;

import java.util.List;


public interface ClientService {

    List<AdDTO> getAllAds();

    List<AdDTO> searchAdByName(String name);

    boolean bookService(ReservationDTO reservationDTO);

    AdDetailsForClientDTO getAdDetailsByAdId(Long adId);

    List<ReservationDTO> getAllBookingsByUserId(Long userId);

    Boolean giveReview(ReviewDTO reviewDTO);

    boolean deleteBooking(Long id);
}
