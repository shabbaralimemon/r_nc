import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    req.body.userRef = req.user.userId;
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return next(errorHandler(404, "Listing not found"));

  if (req.user.userId !== listing.userRef) {
    return next(errorHandler(403, "You can only delete your own listings"));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return next(errorHandler(404, "Listing not found"));

  if (req.user.userId !== listing.userRef) {
    return next(errorHandler(403, "You can only update your own listings"));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListingsByUser = async (req, res) => {
  try {
    const listing = await Listing.find({ userRef: req.user.userId });
    res.status(200).json(listing);
  } catch (error) {
    res.status(404).send("you don't have any listing yet!");
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return next(errorHandler(404, "Listing not found!"));

    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    // let offer = req.query.offer;

    // if (offer === undefined || offer === "false") {
    //   offer = { $in: [false, true] };
    // }

    // let furnished = req.query.furnished;

    // if (furnished === undefined || furnished === "false") {
    //   furnished = { $in: [false, true] };
    // }

    // let parking = req.query.parking;

    // if (parking === undefined || parking === "false") {
    //   parking = { $in: [false, true] };
    // }

    // let type = req.query.type;

    // if (type === undefined || type === "all") {
    //   type = { $in: ["sale", "rent"] };
    // }

    // const searchTerm = req.query.searchTerm || "";
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    let filters = {};

    if (req.query.bedrooms) {
      filters.bedrooms = req.query.bedrooms;
    }
    if (req.query.max_price) {
      filters.regularPrice = { $lte: parseInt(req.query.max_price) };
    }
    if (req.query.furnished) {
      filters.furnished = req.query.furnished;
    }
    if (req.query.parking) {
      filters.parking = req.query.parking;
    }

    const listings = await Listing.find(filters)
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
