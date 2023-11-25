const outletBoardModal = require("../../Model/Reccemanagement/outletUpload");

class outLetBoardManagement {
  async addOutlet(req, res) {
    try {
      const boardData = req.body.boards;
      for (const board of boardData) {
        const {
          outletShopId,
          outletShopName,
          category,
          height,
          width,
          unitsOfMeasurment,
          quantity,
          remark,
          boardType,
          gstNumber,
        } = board;

        const newOutlet = new outletBoardModal({
          outletShopId,
          outletShopName,
          category,
          height,
          width,
          unitsOfMeasurment,
          quantity,
          remark,
          boardType,
          gstNumber,
        });
        const existingBoard = await outletBoardModal.findOne(newOutlet);
        if (existingBoard) {
          console.log(
            `Board document already exists for ${newOutlet.category}`
          );
        } else {
          await newOutlet.save();
          console.log(`Board document created for ${newOutlet.category}`);
        }
      }

      return res.status(200).json({ success: "Thanks for completing the job" });
    } catch (err) {
      console.error(err, "error");
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  async getAllOutlets(req, res) {
    try {
      const outletData = await outletBoardModal.find({});
      return res.status(200).json({ outletData });
    } catch (err) {
      return res.status(500).json({ err: "server error" });
    }
  }

  async getshopDataByShopId(req, res) {
    try {
      let shopId = req.params.id;
      const outletBoard = await outletBoardModal.find({
        outletShopId: shopId,
      });
      if (!outletBoard) {
        return res.status(404).json({ error: "shop details not found" });
      }
      return res.status(200).json({ outletBoard });
    } catch (err) {
      console.log("Error in fetching particular outletBoard by id", err);
      return res.status(500).json({ error: "server error" });
    }
  }
  async getParticularShopById(req, res) {
    try {
      let id = req.params.id;
      const shopData = await outletBoardModal.findOne({
        _id: id,
      });
      if (!shopData) {
        return res.status(404).json({ error: "shop details not found" });
      }
      return res.status(200).json({ shopData });
    } catch (err) {
      console.log("Error in fetching particular shop by id", err);
      return res.status(500).json({ error: "server error" });
    }
  }
  async updateOutletBoard(req, res) {
    try {
      const id = req.params.id;
      const { category, height, width, unitsOfMeasurment, quantity, remark } =
        req.body;
      const findJob = await outletBoardModal.findOne({ _id: id });
      if (!findJob) {
        return res.status(404).json({ error: "No such record found" });
      }
      if (category) findJob.category = category;
      if (height) findJob.height = height;
      if (width) findJob.width = width;

      if (unitsOfMeasurment) findJob.unitsOfMeasurment = unitsOfMeasurment;
      if (quantity) findJob.quantity = quantity;
      if (remark) findJob.remark = remark;
      findJob.isCompleted = true;
      const updatedJob = await findJob.save();
      console.log("updated job", updatedJob);
      return res.status(200).json({
        message: "Updated",
        date: updatedJob,
      });
    } catch (error) {
      console.log("error", error);
      return res
        .status(500)
        .json({ error: "Unable to update the details! Try again later" });
    }
  }

  async uploadBannerImage(req, res) {
    try {
      const shopId = req.params.id;
      // const { jobStatus } = req.body;
      const file = req.file?.filename;

      const findJob = await outletBoardModal.findOne({ _id: shopId });
      if (!findJob) {
        return res.status(404).json({ error: "No such record found" });
      }
      // if (jobStatus) findJob.jobStatus = true;
      if (file) findJob.ouletBannerImage = file;

      const updatedJob = await findJob.save();
      console.log("Uploaded", updatedJob);
      return res.status(200).json({
        message: "Updated",
        date: updatedJob,
      });
    } catch (error) {
      console.log("error", error);
      return res
        .status(500)
        .json({ error: "Can't upload the image! Try again later" });
    }
  }

  // async completeJob(req, res) {
  //   try {
  //     const outletId = req.params.id;
  //     const { shops } = req.body;

  //     const updateJobs = await outletBoardModal.updateMany(
  //       {
  //         _id: outletId,
  //         "outletName._id": { $in: shops.map((shop) => shop._id) },
  //       },
  //       { $set: { "outletName.$.jobStatus": true } },
  //       { new: true }
  //     );

  //     if (!updateJobs) {
  //       return res.status(404).json({ error: "Shops not found" });
  //     }

  //     return res.status(200).json({
  //       statusCode: 200,
  //       success: true,
  //       data: updateJobs,
  //       message: "Thanks for completing the jobs",
  //     });
  //   } catch (error) {
  //     console.error("Error:", error);
  //     return res
  //       .status(500)
  //       .json({ error: "Can't complete the jobs. Try again." });
  //   }
  // }

  // async completeJob(req, res) {
  //   try {
  //     const { jobStatus, outletIds } = req.body;

  //     const updateJobStatus = await outletBoardModal.updateMany(
  //       { _id: { $in: outletIds } },
  //       { $set: { jobStatus } },
  //       { new: true }
  //     );

  //     if (!updateJobStatus) {
  //       res.status(404).json({ error: "Shops not found" });
  //     } else {
  //       return res.status(201).send({
  //         statusCode: 200,
  //         success: true,
  //         data: updateJobStatus,
  //         message: "Thanks for completing the jobs",
  //       });
  //     }
  //   } catch (error) {
  //     console.log("error", error);
  //     return res
  //       .status(500)
  //       .json({ error: "Can't able to complete the job! Try again" });
  //   }
  // }

  // async completeJob(req, res) {
  //   try {
  //     // const outletId = req.params.id;
  //     const { shops } = req.body;

  //     const updatedShops = await Promise.all(
  //       shops.map(async (shop) => {
  //         const updatedShop = await outletBoardModal.findByIdAndUpdate(
  //           shop._id,
  //           { $set: { isCompleted: shop.isCompleted } },
  //           { new: true }
  //         );
  //         return updatedShop;
  //       })
  //     );

  //     return res.status(200).json({
  //       success: true,
  //       data: updatedShops,
  //       message: "Thanks for completing the job",
  //     });
  //   } catch (error) {
  //     console.log("error", error);
  //     return res.status(500).json({
  //       error: "Unable to update the details! Try again later",
  //     });
  //   }
  // }

  async deleteJob(req, res) {
    try {
      const { id } = req.params;
      const deletedJob = await outletBoardModal.findByIdAndDelete(id);
      if (!deletedJob) {
        return res.status(404).json({
          success: false,
          message: "Job not found!",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Job deleted successfully!",
      });
    } catch (error) {
      console.log("error", error);
    }
  }
  async completeJob(req, res) {
    try {
      const { jobStatus, shopIds } = req.body;
  
      // Add validation for required fields
      if (!jobStatus || !Array.isArray(shopIds) || shopIds.length === 0) {
        return res.status(400).json({ error: "Invalid request data" });
      }
  
      const updateJobStatus = await outletBoardModal.updateMany(
        { _id: { $in: shopIds } },
        { $set: { jobStatus } }
      );
  
      console.log("updateJobStatus", updateJobStatus);
  
      if (updateJobStatus.nModified === 0) {
        return res.status(404).json({ error: "Shops not found or no changes made" });
      } else {
        return res.status(200).send({
          statusCode: 200,
          success: true,
          data: updateJobStatus,
          message: "Thanks for completing the jobs",
        });
      }
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({ error: "Can't able to complete the job! Try again" });
    }
  }

  // async completeJob(req, res) {
  //   try {
  //     const { jobStatus } = req.body;
  //     const { shopIds } = req.body;
  //     const updateJobStatus = await outletBoardModal.updateMany(
  //       { _id: { $in: shopIds } },
  //       { $set: { jobStatus } }, // Corrected to use jobStatus
  //       { new: true }
  //     );
  //     console.log("updateJobStatus", updateJobStatus);
  //     if (!updateJobStatus) {
  //       res.status(404).json({ error: "Shops not found" });
  //     } else {
  //       return res.status(201).send({
  //         statusCode: 200,
  //         success: true,
  //         data: updateJobStatus,
  //         message: "Thanks for completing the jobs",
  //       });
  //     }
  //   } catch (error) {
  //     console.log("error", error);
  //     return res
  //       .status(500)
  //       .json({ error: "Can't able to complete the job! Try again" });
  //   }
  // }

  // async completeJob(req, res) {
  //   try {
  //     const shopId = req.params.id;
  //     const { vendorId,jobStatus} = req.body;

  //     const getShopDetails = await outletBoardModal.findByIdAndUpdate(
  //       shopId,
  //       { $set: { vendorId, jobStatus } },
  //       { new: true }
  //     );
  //     //console.log('getShopDetails', getShopDetails);
  //     if (!getShopDetails) {
  //        res.status(404).json({"shop not found"})
  //     } else {
  //       return res.status(201).send({
  //         statusCode: 200,
  //         success: true,
  //         data: getShopDetails,
  //         message:"Thanks for completing the job"
  //       });
  //     }

  //   } catch (error) {
  //     console.log("error", error);
  //     return res
  //       .status(500)
  //       .json({ error: "Unable to update the details! Try again later" });
  //   }
  // }

  // async completeJob(req, res) {
  //   try {
  //     const shopId = req.params.id;
  //     const { vendorId, vendorName } = req.body;
  //     const isCompleted = true;
  //     let data = {};
  //     const getShopDetails = await outletBoardModal.findByIdAndUpdate(
  //       shopId,
  //       { $set: { isCompleted: isCompleted } },
  //       { new: true }
  //     );
  //     if (!getShopDetails) {
  //       throw Error("No Shop Found");
  //     } else {
  //       data["job"] = getShopDetails;
  //       data["message"] = "Thanks for completeting the job";
  //       data["date"] = moment().format("MMM Do YY");
  //       data["time"] = moment().format("hh:mm a");
  //       data["vendor"] = vendorName;
  //       data["vendorId"] = vendorId;
  //       // send email
  //       // mailerService.sendEmailToVendor(data);
  //     }
  //   } catch (error) {
  //     console.log("error", error);
  //     return res
  //       .status(500)
  //       .json({ error: "Unable to update the details! Try again later" });
  //   }
  // }
}

module.exports = new outLetBoardManagement();
