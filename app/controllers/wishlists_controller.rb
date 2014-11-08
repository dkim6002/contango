class WishlistsController < ApplicationController
  before_action :set_wishlist, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!

  def index
    @wishlists = Wishlist.all
    @products = Product.all
  end

  def show
    
  end

  def new
    @wishlist = Wishlist.new
    respond_to do |format|
      format.html
      format.json {render json: @wishlist}
    end
  end

  def edit
  end

  def create
    @wishlist = Wishlist.new(wishlist_params)
    @wishlist.save
    respond_to do |format|
      format.html
      format.json {render json: @wishlist}
    end
  end

  def update
    @wishlist.update(wishlist_params)
  end

  def destroy
    @wishlist.destroy
  end

  private
    def set_wishlist
      @wishlist = Wishlist.find(params[:id])
    end

    def wishlist_params
      params.require(:wishlist).permit(:user_id, :product_id)
    end
end
