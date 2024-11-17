const InvaildProviderAlert = (error) => {
  Swal.fire({
    icon: "error",
    title: "Invaild Provider Url",
    text: error,
  });
};

const NullBlockAlert = (num,latest) => {
  Swal.fire({
    title: "Invaild Block Number" ,
    text: "Block Number "+num+" in null" ,
    icon: "question",
    footer: 'latest block number is '+latest
  });
};

const OutBlockRangeAlert = (from,to) => {
  Swal.fire({
    title: "Invaild block number range" ,
    text: `Block Number ${from} ~ ${to} is out of range` ,
    icon: "error",
  });
};

const GetBlockErrorAlert = (error) => {
    Swal.fire({
        icon: "error",
        title: "Throw error `getBlock`",
        text: error,
      });
}