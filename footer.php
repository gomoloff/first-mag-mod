<?php
/**
 * Modern Clean Footer Template
 * 2026 Light Cyber Space Edition
 * Preserves Yandex.Metrika, Top.Mail.Ru counters, and ya-share2 block
 *
 * @package First_Mag
 */
?>
<footer id="colophon" class="rsrc-footer" role="contentinfo">
	<div class="row rsrc-author-credits">
		<div class="col-sm-12 text-center">
			<!-- Social Share Widget Container -->
			<div class="ya-share2" data-services="vkontakte,facebook,odnoklassniki,moimir,gplus,twitter,linkedin,viber,whatsapp,skype,telegram" data-counter=""></div>
			
			<div class="footer-copyright">
				<?php printf( esc_html__( 'Copyright &copy; %1$s GOMOLOFF | %2$s портал IT & Cosmos', 'first-mag' ), esc_html( date( 'Y' ) ), '<a href="' . esc_url( home_url( '/' ) ) . '" title="First Mag Space Portal">First Mag</a>' ); ?>
			</div>
		</div>
	</div>
</footer>

<!-- Floating Back to Top Control -->
<div id="back-top" style="display:none;">
	<a href="#blog" aria-label="<?php esc_attr_e( 'Наверх', 'first-mag' ); ?>"></a>
</div>

<!-- End rsrc-container -->
</div>

<?php wp_footer(); ?>

<!-- Yandex.Metrika counter -->
<script type="text/javascript">
try {
	var yaCounter1194980 = new Ya.Metrika({
		id: 1194980,
		clickmap: true,
		trackLinks: true,
		accurateTrackBounce: true,
		webvisor: true,
		trackHash: true
	});
} catch(e) {}
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/1194980" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
<!-- /Yandex.Metrika counter -->

<!-- Top.Mail.Ru counter -->
<script type="text/javascript">
var _tmr = window._tmr || (window._tmr = []);
_tmr.push({id: "2869486", type: "pageView", start: (new Date()).getTime()});
(function (d, w, id) {
  if (d.getElementById(id)) return;
  var ts = d.createElement("script"); ts.type = "text/javascript"; ts.async = true; ts.id = id;
  ts.src = "https://top-fwz1.mail.ru/js/code.js";
  var f = function () {var s = d.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ts, s);};
  if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); }
})(document, window, "tmr-code");
</script>
<noscript><div><img src="https://top-fwz1.mail.ru/counter?id=2869486;js=na" style="position:absolute;left:-9999px;" alt="Top.Mail.Ru" /></div></noscript>
<!-- /Top.Mail.Ru counter -->

</body>
</html>
