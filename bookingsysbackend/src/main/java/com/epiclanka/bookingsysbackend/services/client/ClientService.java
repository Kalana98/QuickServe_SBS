package com.epiclanka.bookingsysbackend.services.client;

import com.epiclanka.bookingsysbackend.dto.AdDTO;
import com.epiclanka.bookingsysbackend.dto.AdDetailsForClientDTO;
import com.epiclanka.bookingsysbackend.dto.ReservationDTO;
import com.epiclanka.bookingsysbackend.dto.ReviewDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;


public interface ClientService {

    Page<AdDTO> getAllAds(Long userId, Pageable pageable);

    List<AdDTO> searchAdByName(String name);

    String bookService(ReservationDTO reservationDTO);

    AdDetailsForClientDTO getAdDetailsByAdId(Long adId);

    List<ReservationDTO> getAllBookingsByUserId(Long userId);

    String giveReview(ReviewDTO reviewDTO);

    String deleteBooking(Long id);
}
