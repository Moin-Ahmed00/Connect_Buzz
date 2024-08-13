export const imageUrl = (user) => {
    if (user.image) {
      return user.image.url;
    } else {
      return "/images/avatar.png";
    }
  };