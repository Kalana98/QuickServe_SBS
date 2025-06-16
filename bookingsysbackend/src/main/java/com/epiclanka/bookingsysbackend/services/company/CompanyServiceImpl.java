package com.epiclanka.bookingsysbackend.services.company;

import com.epiclanka.bookingsysbackend.dto.AdDTO;
import com.epiclanka.bookingsysbackend.dto.ReservationDTO;
import com.epiclanka.bookingsysbackend.entity.Ad;
import com.epiclanka.bookingsysbackend.entity.Reservation;
import com.epiclanka.bookingsysbackend.entity.User;
import com.epiclanka.bookingsysbackend.enums.ReservationStatus;
import com.epiclanka.bookingsysbackend.repository.AdRepository;
import com.epiclanka.bookingsysbackend.repository.ReservationRepository;
import com.epiclanka.bookingsysbackend.repository.UserRepository;
import com.epiclanka.bookingsysbackend.util.VarList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Pageable;
import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CompanyServiceImpl implements CompanyService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AdRepository adRepository;

    @Autowired
    private ReservationRepository reservationRepository;

    //Exception: done
    public String postAd(Long userId, AdDTO adDTO) throws IOException {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            Ad ad = new Ad();
            ad.setServiceName(adDTO.getServiceName());
            ad.setDescription(adDTO.getDescription());
            ad.setImg(adDTO.getImg().getBytes());
            ad.setPrice(adDTO.getPrice());
            ad.setUser(optionalUser.get());

            adRepository.save(ad);
            return VarList.RSP_SUCCESS;
        }
        return VarList.RSP_FAIL;
    }

    //Exception: done
    public List<AdDTO> getAllAds(Long userId) {
        return adRepository.findAllByUserId(userId)
                .stream()
                .map(Ad::getAdDto)
                .collect(Collectors.toList());
    }

    //Exception: done
    public AdDTO getAdById(Long adId) {
        Optional<Ad> optionalAd = adRepository.findById(adId);
        if (optionalAd.isPresent()) {
            return optionalAd.get().getAdDto();
        }
        return null;
    }

    //Exception: done
    public String updateAd(Long adId, AdDTO adDTO) throws IOException {
        Optional<Ad> optionalAd = adRepository.findById(adId);
        if (optionalAd.isPresent()) {
            Ad ad = optionalAd.get();

            ad.setServiceName(adDTO.getServiceName());
            ad.setDescription(adDTO.getDescription());
            ad.setPrice(adDTO.getPrice());

            if (adDTO.getImg() != null) {
                ad.setImg(adDTO.getImg().getBytes());
            }

            adRepository.save(ad);
            return VarList.RSP_SUCCESS;
        } else {
            return VarList.RSP_NO_DATA_FOUND;
        }
    }

    //Exception: done
    public String deleteAd(Long adId) {
        Optional<Ad> optionalAd = adRepository.findById(adId);
        if (optionalAd.isPresent()) {
            adRepository.delete(optionalAd.get());
            return VarList.RSP_SUCCESS;
        }
        return VarList.RSP_NO_DATA_FOUND;
    }

    //Exception: done
    @Override
    public Page<ReservationDTO> getAllAdBookings(Long companyId, Pageable pageable) {
        return reservationRepository.findAllByCompanyId(companyId, pageable)
                .map(Reservation::getReservationDto);
    }


    //Exception: done
    public String changeBookingStatus(Long bookingId, String status) {
        Optional<Reservation> optionalReservation = reservationRepository.findById(bookingId);
        if (optionalReservation.isPresent()) {
            Reservation existingReservation = optionalReservation.get();
            if (Objects.equals(status, "Approve")) {
                existingReservation.setReservationStatus(ReservationStatus.APPROVED);
            } else {
                existingReservation.setReservationStatus(ReservationStatus.REJECTED);
            }
            reservationRepository.save(existingReservation);
            return VarList.RSP_SUCCESS;
        }
        return VarList.RSP_NO_DATA_FOUND;
    }




}
