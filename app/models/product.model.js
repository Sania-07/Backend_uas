module.exports = (mongoose) => {
  const Schema = mongoose.Schema(
    {
      no: String,
      nama: String,
      tipe: String,
      alamat: String,
      ulasan: String,
    },
    {
      timestamps: true,
    }
  );
  Schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;

    return object;
  });
  return mongoose.model("Product", Schema);
};
