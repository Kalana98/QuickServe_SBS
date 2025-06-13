package com.epiclanka.bookingsysbackend.repository;

import com.epiclanka.bookingsysbackend.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findAllByAdId(Long adId);

}
