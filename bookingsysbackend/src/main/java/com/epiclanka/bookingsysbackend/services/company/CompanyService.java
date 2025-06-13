package com.epiclanka.bookingsysbackend.services.company;

import com.epiclanka.bookingsysbackend.dto.AdDTO;
import com.epiclanka.bookingsysbackend.dto.ReservationDTO;

import java.io.IOException;
import java.util.List;

public interface CompanyService {

    String postAd(Long userId, AdDTO adDTO) throws IOException;

    List<AdDTO> getAllAds(Long userId);

    AdDTO getAdById(Long adId);

    String updateAd(Long adId, AdDTO adDTO) throws IOException;

    String deleteAd(Long adId);

    List<ReservationDTO> getAllAdBookings(Long companyId);

    String changeBookingStatus(Long bookingId, String status);
}
