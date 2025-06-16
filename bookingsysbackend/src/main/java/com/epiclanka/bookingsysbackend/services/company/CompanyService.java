package com.epiclanka.bookingsysbackend.services.company;

import com.epiclanka.bookingsysbackend.dto.AdDTO;
import com.epiclanka.bookingsysbackend.dto.ReservationDTO;
import org.springframework.data.domain.Page;

import org.springframework.data.domain.Pageable;
import java.io.IOException;
import java.util.List;

public interface CompanyService {

    String postAd(Long userId, AdDTO adDTO) throws IOException;

//    List<AdDTO> getAllAds(Long userId);

    AdDTO getAdById(Long adId);

    String updateAd(Long adId, AdDTO adDTO) throws IOException;

    String deleteAd(Long adId);

    Page<AdDTO> getAllAds(Long userId, Pageable pageable);

    //Exception: done
    Page<ReservationDTO> getAllAdBookings(Long companyId, Pageable pageable);

    String changeBookingStatus(Long bookingId, String status);
}
