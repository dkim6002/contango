class WishlistsController < ApplicationController
  before_action :set_wishlist, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!

  def index
    @wishlists = Wishlist.all
    respond_with(@wishlists)
  end

  def show
    respond_with(@wishlist)
  end

  def new
    @wishlist = Wishlist.new
    respond_with(@wishlist)
  end

  def edit
  end

  def create
    @wishlist = Wishlist.new(wishlist_params)
    @wishlist.save
    respond_with(@wishlist)
  end

  def update
    @wishlist.update(wishlist_params)
    respond_with(@wishlist)
  end

  def destroy
    @wishlist.destroy
    respond_with(@wishlist)
  end

  private
    def set_wishlist
      @wishlist = Wishlist.find(params[:id])
    end

    def wishlist_params
      params[:wishlist]
    end
end
