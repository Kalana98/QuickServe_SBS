package com.epiclanka.bookingsysbackend.services.client;

import com.epiclanka.bookingsysbackend.dto.AdDTO;
import com.epiclanka.bookingsysbackend.dto.AdDetailsForClientDTO;
import com.epiclanka.bookingsysbackend.dto.ReservationDTO;
import com.epiclanka.bookingsysbackend.dto.ReviewDTO;
import com.epiclanka.bookingsysbackend.entity.Ad;
import com.epiclanka.bookingsysbackend.entity.Reservation;
import com.epiclanka.bookingsysbackend.entity.Review;
import com.epiclanka.bookingsysbackend.entity.User;
import com.epiclanka.bookingsysbackend.enums.ReservationStatus;
import com.epiclanka.bookingsysbackend.enums.ReviewStatus;
import com.epiclanka.bookingsysbackend.repository.AdRepository;
import com.epiclanka.bookingsysbackend.repository.ReservationRepository;
import com.epiclanka.bookingsysbackend.repository.ReviewRepository;
import com.epiclanka.bookingsysbackend.repository.UserRepository;
import com.epiclanka.bookingsysbackend.util.VarList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ClientServiceImpl implements ClientService {

    @Autowired
    private AdRepository adRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    //Exception: done
    public List<AdDTO> getAllAds(){
        return adRepository.findAll().stream().map(Ad::getAdDto).collect(Collectors.toList());
    }

    //Exception: done
    public List<AdDTO> searchAdByName(String name){
        return adRepository.findAllByServiceNameContaining(name).stream().map(Ad::getAdDto).collect(Collectors.toList());
    }

    //Exception: done
    public String bookService(ReservationDTO reservationDTO) {
        Optional<Ad> optionalAd = adRepository.findById(reservationDTO.getAdId());
        Optional<User> optionalUser = userRepository.findById(reservationDTO.getUserId());

        if (optionalAd.isPresent() && optionalUser.isPresent()) {
            Reservation reservation = new Reservation();

            reservation.setBookDate(reservationDTO.getBookDate());
            reservation.setReservationStatus(ReservationStatus.PENDING);
            reservation.setUser(optionalUser.get());

            reservation.setAd(optionalAd.get());
            reservation.setCompany(optionalAd.get().getUser());
            reservation.setReviewStatus(ReviewStatus.FALSE);

            reservationRepository.save(reservation);
            return VarList.RSP_SUCCESS;

        }else if(!optionalAd.isPresent() || !optionalUser.isPresent())
            return VarList.RSP_NO_DATA_FOUND;
        return VarList.RSP_FAIL;
    }

    //Exception: done
    public AdDetailsForClientDTO getAdDetailsByAdId(Long adId) {
        Optional<Ad> optionalAd = adRepository.findById(adId);
        AdDetailsForClientDTO adDetailsForClientDTO = new AdDetailsForClientDTO();
        if (optionalAd.isPresent()) {
            adDetailsForClientDTO.setAdDTO(optionalAd.get().getAdDto());
            List<Review> reviewList = reviewRepository.findAllByAdId(adId);
            adDetailsForClientDTO.setReviewDTOList(reviewList.stream().map(Review::getDto).collect(Collectors.toList()));
        }
        return adDetailsForClientDTO;
    }

    //Exception: done
    public List<ReservationDTO> getAllBookingsByUserId(Long userId) {
        return reservationRepository.findAllByUserId(userId).stream().map(Reservation::getReservationDto).collect(Collectors.toList());
    }

    //Exception: done
    public String deleteBooking(Long id) {

        Optional<Reservation> optionalBooking = reservationRepository.findById(id);

        if (optionalBooking.isPresent()) {
            reservationRepository.delete(optionalBooking.get());
            return VarList.RSP_SUCCESS;
        } else if (!optionalBooking.isPresent()) {
            return VarList.RSP_NO_DATA_FOUND;
        }
        return VarList.RSP_FAIL;

    }

    //Exception: done
    public String giveReview(ReviewDTO reviewDTO) {

        Optional<User> optionalUser = userRepository.findById(reviewDTO.getUserId());
        Optional<Reservation> optionalBooking = reservationRepository.findById(reviewDTO.getBookId());

        if (optionalUser.isPresent() && optionalBooking.isPresent()) {
            Review review = new Review();

            review.setReviewDate(new Date());
            review.setReview(reviewDTO.getReview());
            review.setRating(reviewDTO.getRating());

            review.setUser(optionalUser.get());
            review.setAd(optionalBooking.get().getAd());

            reviewRepository.save(review);

            Reservation booking = optionalBooking.get();
            booking.setReviewStatus(ReviewStatus.TRUE);
            reservationRepository.save(booking);

            return VarList.RSP_SUCCESS;

        } else if (!optionalUser.isPresent() || !optionalBooking.isPresent()) {
            return VarList.RSP_SOMETHING_IS_MISSING;
        } else {
            return VarList.RSP_FAIL;
        }


    }


}
